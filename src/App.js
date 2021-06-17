/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';
import { useEffect } from 'react';

const apiToken = 'BQCk2Mqgp-EVUrLs8F63JlHKZOF9p7WA5afz4kL8l7skND7D7kel5_KEkhqdYcK59bRUM-CLEYdMXdVhOI0Yu50MZPoRPGwqHfty4wDuUM-zSs-sNAw8stszRsOqlWaHHZc36u71Ec2y4lQiXGIZ_FRvILLYCCRo-R6MnRBvoGRQ';
function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const AlbumCover = (props) => {
  const src = props.track.album.images[0].url;
    return (
      <img src={src} style={{ width: 400, height: 400 }} />
  );
}

const Tracks = (props) => {
  const one = props[0].track;
  const two = props[1].track;
  const three = props[2].track;
}

const checkAnswer = (tracks, name) => {
  if (name==tracks[4].track.name) {
    swal('Bravo', 'Tu as gagné');
  } else {
    swal('Sale merde', 'Tu es nul');
  }
}

const App = () => {
  const [tracks, setTracks] = useState('');
  const [songsLoaded, setSongs] = useState(false);
  const [image, setImage] = useState(loading);
  const [taille, setTaille] = useState('');

  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        setTracks(data.items);
        setImage(logo);
        setTaille('On a ' +  data.items.length + ' chansons');
        setSongs(true);
        console.log(tracks);
      })
  }, [])

 return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        {songsLoaded && <AlbumCover track = {tracks[4].track}/>}
        <p>On va bientôt pouvoir commencer :)</p>
	      <p>{taille}</p>
        {songsLoaded && <p> La première chanson est {tracks[4].track.name}</p>}
      </div>
      <div className="App-buttons">
        {songsLoaded && <Button onClick={() => checkAnswer(tracks, tracks[4].track.name)}>{tracks[4].track.name}</Button>}
        {songsLoaded && <Button onClick={() => checkAnswer(tracks, tracks[1].track.name)}>{tracks[1].track.name}</Button>}
        {songsLoaded && <Button onClick={() => checkAnswer(tracks, tracks[2].track.name)}>{tracks[2].track.name}</Button>}
      {songsLoaded && <Sound url={tracks[2].track.preview_url} playStatus={Sound.status.PLAYING}/>}
      </div>
    </div>
  );
}

export default App;