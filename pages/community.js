import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/data/userData';
import UserCard from '../components/Cards/UserCard';

export default function Community() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => setAllUsers(data));
  }, [allUsers]);

  return (
    <div>
      <h1>Watch Party Community</h1>
      {allUsers.map((user) => (
        <section key={`user--${user.id}`} className="user">
          <UserCard userObj={user} />
        </section>
      ))}
    </div>
  );
}
