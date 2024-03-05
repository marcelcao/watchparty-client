import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import ShowCard from '../components/Cards/ShowCard';
import PartyCard from '../components/Cards/PartyCard';
import { getSingleUser } from '../utils/data/userData';
import { getAllShowsBySignedInUser } from '../utils/data/showData';
import { getAllParties } from '../utils/data/partyData';
import TVShowModal from '../components/Modals/ShowModal';
import PartyModal from '../components/Modals/PartyModal';

function Home() {
  const [userDetail, setUserDetail] = useState({});
  const [shows, setShows] = useState([]);
  const [parties, setParties] = useState([]);
  const { user } = useAuth();

  const getUser = () => {
    getSingleUser(user.id).then((data) => setUserDetail(data));
  };

  const getUserShows = () => {
    getAllShowsBySignedInUser(user.uid).then((data) => setShows(data));
  };

  const getWatchParties = () => {
    getAllParties(user.uid).then((data) => setParties(data));
  };

  const fetchParties = () => {
    getWatchParties();
  };

  const fetchShows = () => {
    getUserShows();
  };

  useEffect(() => {
    getUser(user.id);
  }, [user.id]);

  useEffect(() => {
    getUserShows();
  }, []);

  useEffect(() => {
    getWatchParties();
  }, []);

  const sortedShows = shows.sort((a, b) => b.id - a.id);
  const mostRecentShows = sortedShows.slice(0, 5);

  const sortedParties = parties.sort((a, b) => b.id - a.id);
  const mostRecentParties = sortedParties.slice(0, 5);

  return (
    <>
      <div className="welcome-mesage">
        Welcome @{userDetail.username}!
      </div>
      <div className="user-shows-container">
        <div>
          <div>
            Your Recently Added Shows:
          </div>
          <div>
            <TVShowModal fetchShows={fetchShows} />
          </div>
        </div>
        <div className="show-card-contain">
          {mostRecentShows.map((show) => (
            <section key={`show--${show.id}`} className="show">
              <ShowCard showObj={show} />
            </section>
          ))}
        </div>
      </div>
      <div className="watch-parties-container">
        <div>
          <div>
            Recently Added Parties:
          </div>
          <div>
            <PartyModal fetchParties={fetchParties} />
          </div>
        </div>
        <div className="party-card-contain">
          {mostRecentParties.map((party) => (
            <section key={`party--${party.id}`} className="party">
              <PartyCard partyObj={party} onUpdate={getWatchParties} attended={party.attended} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
