from typing import List
from ninja import NinjaAPI, Schema
from django.shortcuts import get_object_or_404
from pydantic import EmailStr, Field, validator, BaseModel
from django.forms.models import model_to_dict
from django.core.paginator import Paginator
from django.db.models import Q
from django.http import JsonResponse

from .models import User

api = NinjaAPI()

def custom_error_response(errors: List[dict]):
    return JsonResponse({'detail': errors}, status=422)

@api.exception_handler(ValueError)
def value_error_handler(request, exc):
    errors = []
    if str(exc).startswith('Email already exists'):
        errors.append({
            "type": "value_error",
            "loc": ["body", "data", "email"],
            "msg": str(exc),
            "ctx": {"reason": str(exc)}
        })
    else:
        errors.append({
            "type": "value_error",
            "loc": ["body", "data", "email"],
            "msg": str(exc),
            "ctx": {"reason": str(exc)}
        })
    return custom_error_response(errors)

class UserInSchema(BaseModel):
    name: str = Field(..., example="John Doe")
    phone: str = Field(..., example="+1234567890")
    email: EmailStr = Field(..., example="john.doe@example.com")
    
    @validator('name')
    def name_not_empty(cls, value: str) -> str:
        if not value.strip():
            raise ValueError('Name must not be empty')
        return value
    
    @validator('phone')
    def phone_not_empty(cls, value: str) -> str:
        if not value.strip():
            raise ValueError('Phone must not be empty')
        return value
    
    @validator('email')
    def email_not_empty(cls, value: str) -> str:
        if not value.strip():
            raise ValueError('Email must not be empty')
        return value

class UserOutSchema(BaseModel):
    id: int
    name: str
    phone: str
    email: EmailStr

    @classmethod
    def from_django(cls, instance):
        data = model_to_dict(instance)
        return cls(**data)

class PaginatedUsersSchema(Schema):
    total: int
    page: int
    per_page: int
    total_pages: int
    users: List[UserOutSchema]

@api.get("/users", response=PaginatedUsersSchema)
def list_users(request, page: int = 1, per_page: int = 5, search: str = ''):
    users = User.objects.all().order_by('-updated_at')

    if search:
        users = users.filter(Q(name__icontains=search))
    
    paginator = Paginator(users, per_page)
    paginated_users = paginator.get_page(page)

    return {
        "users": [UserOutSchema.from_django(user) for user in paginated_users],
        "page": paginated_users.number,
        "per_page": per_page,
        "total": paginator.count,
        "total_pages": paginator.num_pages
    }

@api.post("/users", response=UserOutSchema)
def create_user(request, data: UserInSchema):
    if User.objects.filter(email=data.email).exists():
        raise ValueError('Email already exists')
    
    user = User.objects.create(**data.dict())
    return UserOutSchema.from_django(user)

@api.get("/users/{user_id}", response=UserOutSchema)
def get_user(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    return UserOutSchema.from_django(user)

@api.put("/users/{user_id}", response=UserOutSchema)
def update_user(request, user_id: int, data: UserInSchema):
    user = get_object_or_404(User, id=user_id)

    # Check for unique email, excluding the current user
    if User.objects.filter(email=data.email).exclude(id=user_id).exists():
        raise ValueError('Email already exists')
    
    for attr, value in data.dict().items():
        setattr(user, attr, value)
    user.save()
    
    return UserOutSchema.from_django(user)

@api.delete("/users/{user_id}", response={204: None})
def delete_user(request, user_id: int):
    user = get_object_or_404(User, id=user_id)
    user.delete()
    return 204, None
