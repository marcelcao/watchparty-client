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

  useEffect(() => {
    getUserShows();
  }, []);

  useEffect(() => {
    setShowTVShow(shows);
  }, [shows]);

  return (
    <>
      <div className="user-shows-container">
        <div>
          <div>
            Your TV Shows:
          </div>
          <div>
            <TVShowModal fetchShows={fetchShows} />
          </div>
          <div className="search-rout">
            <SearchBar onChange={(query) => filterSearchResult(query)} />
          </div>
        </div>
        <div className="show-card-contain">
          {showTVShow.map((show) => (
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
