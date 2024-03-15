import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/data/userData';
import UserCard from '../components/Cards/UserCard';

export default function Community() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => setAllUsers(data));
  }, []);

  useEffect(() => {
    document.title = 'Community - Watch Party';
  }, []);

  return (
    <div className="community-page">
      <h1 id="home-header">Watch Party Community</h1>
      <div className="users-container">
        {allUsers.map((user) => (
          <section key={`user--${user.id}`}>
            <UserCard userObj={user} />
          </section>
        ))}
      </div>
    </div>
  );
}
