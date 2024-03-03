import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import ShowCard from '../../components/Cards/ShowCard';
import { getAllShowsBySignedInUser } from '../../utils/data/showData';
import TVShowModal from '../../components/Modals/ShowModal';

function AllShows() {
  const [shows, setShows] = useState([]);
  const { user } = useAuth();

  const getUserShows = () => {
    getAllShowsBySignedInUser(user.uid).then((data) => setShows(data));
  };

  const fetchShows = () => {
    getUserShows();
  };

  useEffect(() => {
    getUserShows();
  }, []);

  return (
    <>
      <div className="user-shows-container">
        <div>
          <div>
            Your Shows:
          </div>
          <div>
            <TVShowModal fetchShows={fetchShows} />
          </div>
        </div>
        <div className="show-card-contain">
          {shows.map((show) => (
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
