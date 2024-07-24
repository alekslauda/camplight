import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Toolbar/shared/UIEelements/Card';
import './UserItem.css';

const UserItem = props => {

  const deleteHandler = (userId) => {
    props.onDelete(userId);
  }

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/users/${props.id}`}>
          <div className="user-item__info">
            <h3>[ #{props.id} ] {props.name}</h3>
            <span>EMAIL: {props.email}</span>
            <span>PHONE: {props.phone}</span>
          </div>
        </Link>
      </Card>
      <button onClick={() => deleteHandler(props.id)}>X</button>
    </li>
  );
};

export default UserItem;
