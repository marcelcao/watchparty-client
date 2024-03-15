/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUserAttendedParties, getUserParties } from '../../utils/data/partyData';
import { getUsername } from '../../utils/auth';

export default function ProfilePage() {
  const router = useRouter();

  const { username } = router.query;
  const [parties, setParties] = useState([]);
  const [attendedParties, setAttendedParties] = useState([]);
  const [profile, setProfile] = useState({});

  const getUserAccount = (name) => {
    getUsername(name).then((res) => setProfile(res));
  };

  const getAllPartiesbyUser = (uid) => {
    getUserParties(uid).then((res) => setParties(res));
  };

  const getPartiesAttendedByUser = (uid) => {
    getUserAttendedParties(uid).then((res) => setAttendedParties(res));
  };

  useEffect(() => {
    getUserAccount(username);
  }, [username]);

  useEffect(() => {
    if (profile.uid) {
      getAllPartiesbyUser(profile.uid);
    }
  }, [profile.uid]);

  useEffect(() => {
    if (profile.uid) {
      getPartiesAttendedByUser(profile.uid);
    }
  }, [profile.uid]);

  useEffect(() => {
    document.title = `@${profile.username || 'Loading...'} - Watch Party`;
  }, [profile.username]);

  return (
    <div className="profile-page">
      <div className="user-profile-container">
        <div className="profile-pic">
          <img className="profile-img-page" src={profile.image_url} alt={profile.username} />
        </div>
        <h1>{profile.first_name} {profile.last_name}</h1>
        <h2>@{profile.username}</h2>
        <section className="profile-bio">{profile.bio}</section>
      </div>
      <div className="user-party-container">
        <div className="party-list">
          <h1>Created Parties</h1>
        </div>
        <div className="parties">
          {parties.length === 0 ? (
            <p>No parties yet</p>
          ) : (
            parties.map((party) => (
              <div key={party.id}>
                <img className="show-img" src={party.tv_show?.show_poster} alt={party.tv_show?.show_title} style={{ width: '7rem', height: '10rem' }} />
                <Link href={`/parties/${party.id}`} passHref>
                  <section className="party-name">{party.party_name}</section>
                </Link>
              </div>
            ))
          )}
        </div>
        <div className="user-attended-container">
          <div className="attended-list">
            <h1>Attending</h1>
          </div>
          <div className="attending">
            {attendedParties.length === 0 ? (
              <p>Not attending any parties yet</p>
            ) : (
              attendedParties.map((party) => (
                <div key={party.id}>
                  <img className="show-img" src={party.tv_show?.show_poster} alt={party.tv_show?.show_title} style={{ width: '7rem', height: '10rem' }} />
                  <Link href={`/parties/${party.id}`} passHref>
                    <section className="party-name">{party.party_name}</section>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
