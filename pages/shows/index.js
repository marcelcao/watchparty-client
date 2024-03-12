import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import ShowCard from '../../components/Cards/ShowCard';
import { getAllShowsBySignedInUser } from '../../utils/data/showData';
import TVShowModal from '../../components/Modals/ShowModal';
import SearchBar from '../../components/SearchBar';

function AllShows() {
  const [shows, setShows] = useState([]);
  const [showTVShow, setShowTVShow] = useState([]);
  const { user } = useAuth();

  const getUserShows = () => {
    getAllShowsBySignedInUser(user.uid).then((data) => setShows(data));
  };

  const fetchShows = () => {
    getUserShows();
  };

  const filterSearchResult = (query) => {
    const filter = shows.filter((show) => show.show_title.toLowerCase().includes(query));
    setShowTVShow(filter);
  };

  const alphabeticalShows = showTVShow.sort((a, b) => a.show_title.localeCompare(b.show_title));

  useEffect(() => {
    getUserShows();
  }, []);

  useEffect(() => {
    setShowTVShow(shows);
  }, [shows]);

  useEffect(() => {
    document.title = 'Your Shows - Watch Party';
  }, []);

  return (
    <>
      <div className="user-shows-container">
        <h1 id="home-header">Your Shows</h1>
        <div className="search-show">
          <SearchBar onChange={(query) => filterSearchResult(query)} />
        </div>
        <TVShowModal fetchShows={fetchShows} />
      </div>
      <div className="show-card-wrapper">
        <div className="show-cards-container">
          {alphabeticalShows.map((show) => (
            <section key={`show--${show.id}`} className="show">
              <ShowCard showObj={show} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default AllShows;
