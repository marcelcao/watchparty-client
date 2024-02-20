/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { deleteShow, getSingleShow } from '../../utils/data/showData';
import TVShowModal from '../../components/Modals/ShowModal';

function SingleShow() {
  const [singleShow, setSingleShow] = useState({});

  const router = useRouter();
  const { id } = router.query;

  const deleteThisShow = () => {
    if (window.confirm('Delete TV Show?')) {
      deleteShow(id).then(() => {
        router.push('/');
      });
    }
  };

  useEffect(() => {
    getSingleShow(id)
      .then((data) => setSingleShow(data));
  }, [id]);

  return (
    <article className="single-tv-show">
      <div className="show-body">
        <div className="show-img-container">
          <img className="show-img" src={singleShow.show_poster} alt={singleShow.show_title} style={{ width: '7rem', height: '10rem' }} />
          <div className="show-info-btns">
            <TVShowModal obj={singleShow} />
            <Button
              className="delete-show-btn"
              onClick={deleteThisShow}
            >Delete Show
            </Button>
            <Button
              className="mark-show-btn"
              onClick={deleteThisShow}
            >Conditionally render marked as watched button
            </Button>
          </div>
        </div>
        <div className="show-details-container">
          <h1>{singleShow.show_title}</h1>
          <h2>{singleShow.show_genre?.genre}</h2>
          <h3>{singleShow.show_description}</h3>
          <p>{singleShow.is_watching ? 'Currently Watching' : 'Marked As Watched'}</p>
        </div>
      </div>
    </article>
  );
}

export default SingleShow;
