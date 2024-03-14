/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import {
  deleteShow, getSingleShow, markShowAsWatched, markShowAsWatching,
} from '../../utils/data/showData';
import TVShowModal from '../../components/Modals/ShowModal';

function SingleShow() {
  const [singleShow, setSingleShow] = useState({});
  const [change, setChange] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const deleteThisShow = () => {
    if (window.confirm('Delete TV Show?')) {
      deleteShow(id).then(() => {
        router.push('/');
      });
    }
  };

  const watched = () => {
    markShowAsWatched(id).then(setChange((prevState) => !prevState));
  };

  const watching = () => {
    markShowAsWatching(id).then(setChange((prevState) => !prevState));
  };

  const fetchSingleShow = () => {
    getSingleShow(id).then((data) => setSingleShow(data));
  };

  useEffect(() => {
    getSingleShow(id)
      .then((data) => setSingleShow(data));
  }, [id, change]);

  useEffect(() => {
    document.title = `${singleShow.show_title || 'Loading...'} - Watch Party`;
  }, [singleShow.show_title]);

  return (
    <article className="single-tv-show">
      <div className="show-body">
        <div className="show-img-container">
          <img className="show-img" src={singleShow.show_poster} alt={singleShow.show_title} />
        </div>
        <TVShowModal obj={singleShow} fetchSingleShow={fetchSingleShow} />
        {(singleShow.is_watching === true) ? (
          <Button
            className="mark-show-btn"
            onClick={watched}
          >Mark As Watched
          </Button>
        ) : (
          <Button
            className="mark-show-btn"
            onClick={watching}
          >Mark As Watching
          </Button>
        )}
        <Button
          className="delete-show-btn"
          onClick={deleteThisShow}
        >Delete Show
        </Button>
      </div>
      <div className="show-details-container">
        <div className="show-title">
          <h1 id="show-title-header">{singleShow.show_title}</h1>
        </div>
        <div className="show-description">
          <section className="show-genre">{singleShow.show_genre?.genre}</section>
          <section className="description-details">{singleShow.show_description}</section>
          <section className="is-watching">{singleShow.is_watching ? 'Currently Watching' : 'Series Watched'}</section>
        </div>
      </div>
    </article>
  );
}

export default SingleShow;
