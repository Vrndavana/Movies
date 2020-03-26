import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  console.log(props);
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  // handleUpdate - add props to function Movie lin 6

  const handleUpdate = e => {
    e.preventDefault();
    props.history.push(`/update-movie/${movie.id}`)
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {console.log('Delete Log', res.data); props.getMovieList(); props.history.push('/');})
      .catch(err => console.log(err))
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>

      <MovieCard movie={movie} />
      <div className='update-button' onClick={handleUpdate}> Update </div> 
      <div className='save-button'   onClick={saveMovie}> Save </div>
      <div className='delete-button' onClick={handleDelete}> Delete </div>

    </div>
  );
}

export default Movie;
