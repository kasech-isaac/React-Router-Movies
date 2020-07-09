import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
    // setMovieList([...movieList, movie]);
  };

  return (
    <div>
     <Router>
      <SavedList list={savedList} />
      <Switch>
      <Route path="/SavedList" component={SavedList}/>
   <Route path="/Movie/:id">
        <Movie movies={movieList}/>
   </Route>
   <Route path="/">
     <MovieList movielistess= {movieList}/>
   </Route>
       </Switch>
      </Router>
    </div>
  );
};

export default App;
