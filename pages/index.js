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

  useEffect(() => {
    getUser(user.id);
  }, [user.id]);

  useEffect(() => {
    getUserShows();
  }, []);

  useEffect(() => {
    getWatchParties();
  }, []);

  return (
    <>
      <div className="welcome-mesage">
        Welcome @{userDetail.username}!
      </div>
      <div className="user-shows-container">
        <div>
          <div>
            Your Shows
          </div>
          <div>
            <TVShowModal />
          </div>
        </div>
        <div>
          {shows.map((show) => (
            <section key={`show--${show.id}`} className="show">
              <ShowCard showObj={show} />
            </section>
          ))}
        </div>
      </div>
      <div className="watch-parties-container">
        <div>
          <div>
            All Parties
          </div>
          <div>
            <PartyModal />
          </div>
        </div>
        <div>
          {parties.map((party) => (
            <section key={`party--${party.id}`} className="party">
              <PartyCard partyObj={party} attended={party.attended} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
