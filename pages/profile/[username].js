/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserParties } from '../../utils/data/partyData';
import { getUsername } from '../../utils/auth';
import PartyCard from '../../components/Cards/PartyCard';

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
        Your Parties
        {parties.map((party) => (
          <section key={`party--${party.id}`} className="party">
            <PartyCard partyObj={party} attended={party.attended} onUpdate={getAllPartiesbyUser} />
          </section>
        ))}
      </div>
    </div>
  );
}
