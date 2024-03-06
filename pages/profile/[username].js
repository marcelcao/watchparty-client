/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUserParties } from '../../utils/data/partyData';
import { getUsername } from '../../utils/auth';

export default function ProfilePage() {
  const router = useRouter();

  const { username } = router.query;
  const [parties, setParties] = useState([]);
  const [profile, setProfile] = useState({});

  const getUserAccount = (name) => {
    getUsername(name).then((res) => setProfile(res));
  };

  const getAllPartiesbyUser = (uid) => {
    getUserParties(uid).then((res) => setParties(res));
  };

  useEffect(() => {
    getUserAccount(username);
  }, [username]);

  useEffect(() => {
    if (profile.uid) {
      getAllPartiesbyUser(profile.uid);
    }
  }, [profile.uid]);

  return (
    <div>
      <div className="user-profile-container">
        <img className="profile-img" src={profile.image_url} alt={profile.username} style={{ width: '10rem', height: '10rem' }} />
        <h1>{profile.first_name} {profile.last_name}</h1>
        <h2>@{profile.username}</h2>
        <p>{profile.bio}</p>
      </div>
      <div className="user-party-container">
        <h1>Party List</h1>
        {parties.length === 0 ? (
          <p>No parties yet</p>
        ) : (
          parties.map((party) => (
            <div key={party.id}>
              <img className="show-img" src={party.tv_show?.show_poster} alt={party.tv_show?.show_title} style={{ width: '7rem', height: '10rem' }} />
              <Link href={`/parties/${party.id}`} passHref>
                <p>{party.party_name}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
