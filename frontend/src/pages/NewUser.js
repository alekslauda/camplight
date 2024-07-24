import React, { useState, useCallback } from 'react';
import './NewUser.css';
import { newUser } from '../services/api';
import { useHistory } from 'react-router-dom';

const NewUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const newUserSubmitHandler = async (e) => {
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
    newUser(formData).then(user => {
      console.log("New user added:", user);
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
      history.push('/users');
    }).catch(error => {
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

  const inputHandler = useCallback((event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  }, []);

  return (
    <React.Fragment>
      <form className='new__user-form' onSubmit={newUserSubmitHandler}>
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
          ADD USER
        </button>
      </form>
    </React.Fragment>
  );
}

export default NewUser;
