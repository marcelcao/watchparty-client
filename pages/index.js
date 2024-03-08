import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

  useEffect(() => {
    document.title = 'Home - Watch Party';
  }, []);

  const sortedShows = shows.sort((a, b) => b.id - a.id);
  const mostRecentShows = sortedShows.slice(0, 5);

  const sortedParties = parties.sort((a, b) => b.id - a.id);
  const mostRecentParties = sortedParties.slice(0, 5);

  return (
    <>
      <div className="welcome-message">
        Welcome @{userDetail.username}!
      </div>
      <div>
        <div className="user-shows-container">
          <div>
            <h1 id="home-header">Your Recently Added Shows</h1>
          </div>
          <div>
            <TVShowModal fetchShows={fetchShows} />
          </div>
        </div>
        <Slider {...settings}>
          {mostRecentShows.map((show) => (
            <section key={`show--${show.id}`} className="show">
              <ShowCard showObj={show} />
            </section>
          ))}
        </Slider>
      </div>
      <div className="watch-parties-container">
        <div>
          <div>
            <h1 id="home-header">Recently Added Parties</h1>
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
