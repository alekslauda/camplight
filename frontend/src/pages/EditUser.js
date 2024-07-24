import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserById, updateUser } from '../services/api';
import './NewUser.css';

const EditUser = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    getUserById(userId).then(user => {
      const {name, phone, email} = user;
      setFormData({name, phone, email});
      setUserNotFound(false);
    }).catch( err => {
      setUserNotFound(true);
    });
  }, [userId]);

  // Handle input changes
  const inputHandler = useCallback((event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  }, []);

  // Handle form submission
  const editUserSubmitHandler = async (e) => {
    e.preventDefault();

    const { name, email, phone } = formData;
    const frontendErrors = {};

    // Frontend validation
    if (name.trim() === '') frontendErrors.name = 'Name is required.';
    if (email.trim() === '') frontendErrors.email = 'Email is required.';
    if (phone.trim() === '') frontendErrors.phone = 'Phone is required.';

    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }
    updateUser(userId, formData).then(updatedUser => {
      history.push('/users');
    }).catch(error =>{
      if (error.response && error.response.data && Array.isArray(error.response.data.detail)) {
        const backendErrors = {};
        error.response.data.detail.forEach(detail => {
          if (detail.loc.includes('name')) {
            backendErrors.name = detail.msg || 'Invalid name';
          } else if (detail.loc.includes('phone')) {
            backendErrors.phone = detail.msg || 'Invalid phone number';
          } else if (detail.loc.includes('email')) {
            backendErrors.email = detail.msg || 'Invalid email address';
          }
        });
        setErrors(backendErrors);
      }
    })
  };

  if (userNotFound) {
    return (<h1>ID[#{userId}] not found</h1>);
  }

  return (
    <React.Fragment>
      <form className='new__user-form' onSubmit={editUserSubmitHandler}>
        <div className={`form-control ${errors.name ? 'form-control--invalid' : ''}`}>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type="text"
            value={formData.name}
            onChange={inputHandler}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className={`form-control ${errors.email ? 'form-control--invalid' : ''}`}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type="text"
            value={formData.email}
            onChange={inputHandler}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className={`form-control ${errors.phone ? 'form-control--invalid' : ''}`}>
          <label htmlFor='phone'>Phone</label>
          <input
            id='phone'
            type="text"
            value={formData.phone}
            onChange={inputHandler}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <button type="submit">
          EDIT USER
        </button>
      </form>
    </React.Fragment>
  );
};

export default EditUser;
