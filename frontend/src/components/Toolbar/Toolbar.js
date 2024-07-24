import React from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = props => (
  <header className='toolbar'>
    <nav className='toolbar__navigation'>
      <div>
      </div> {/*burger*/}
      <div className='toolbar__logo'>
        <NavLink to="/">CAMPLIGHT</NavLink> {/*logo*/}
      </div>
      <div className='spacer' />
      <div className='toolbar__navigation-items'>
        <ul>
          <li>
            <NavLink to="/" activeClassName="toolbar__navigation-items--active" exact>HOME</NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="toolbar__navigation-items--active" exact>USERS</NavLink>
          </li>
          <li>
            <NavLink to="/users/new" activeClassName="toolbar__navigation-items--active" exact>ADD NEW USER</NavLink>
          </li>
        </ul>
      </div> {/*links*/}
    </nav>
  </header>
)

export default Toolbar;
