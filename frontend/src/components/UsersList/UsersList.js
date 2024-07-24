import React, { useState, useEffect } from 'react';
import UserItem from '../UserItem/UserItem';
import Pagination from '../Pagination/Pagination';
import SearchUsers from '../SearchUsers/SearchUsers';
import { fetchUsers } from '../../services/api';
import { deleteUserById } from '../../services/api';

import './UsersList.css';

const UsersList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers(currentPage, usersPerPage, searchTerm).then(response => {
      setUsers(response.data.users);
      setTotalUsers(response.data.total);
      setTotalPages(response.data.total_pages);
      setCurrentPage(response.data.page);
      setUsersPerPage(response.data.per_page);
    }).catch(err => console.log("err", err));
  }, [searchTerm, currentPage, usersPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update currentPage state
    }
  };

  const handleDelete = (userId) => {
    deleteUserById(userId).then(() => {
      // Refresh user list after successful deletion
      fetchUsers(currentPage, usersPerPage, searchTerm).then(response => {
        setUsers(response.data.users);
        setTotalUsers(response.data.total);
        setTotalPages(response.data.total_pages);
      }).catch(err => console.log("err", err));
    }).catch(err => console.log("Deletion error:", err));
  };


  return (
    <React.Fragment>
      <SearchUsers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1 style={{ color: 'white' }}>Total Users: {totalUsers}</h1>
      {users.length > 0 && (
        <div>
          <ul className="users-list">
            {users.map(user => (
              <UserItem 
                key={user.id} 
                id={user.id} 
                name={user.name} 
                email={user.email} 
                phone={user.phone}
                onDelete={handleDelete}
              />
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default UsersList;
