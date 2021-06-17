/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react';

const apiToken = 'BQCmSrF62O2phe8OPcVma3Ypsai40PogvyJ14Lsk7h2yVdT8ggTegCJ7jqWyLFIDozXGSOduVSeLNNAJrefxONDykT1mbPldN5ESlkwjuSr2ii2NxF6XCT3DbO5MoxkcglWY6LpCBljh8hSSLOiNeb92U_cGxGjl2FuEiZO44Kp0';
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

const App = () => {
  const [text, setText] = useState('');
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
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        setText('Bonjour');
        setTracks(data.items);
        setImage(logo);
        setTaille('On a ' +  data.items.length + ' chansons');
        console.log(data.items[2].track.name);
        setSongs(true);
        console.log(data.items[2].track);
      })
  }, [])

 return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        {songsLoaded && <AlbumCover track = {tracks[2].track}/>}
        <p>On va bientôt pouvoir commencer :)</p>
	      <p>{taille}</p>
        {songsLoaded && <p> La première chanson est {tracks[2].track.name}</p>}
      </div>
      <div className="App-buttons">
      {songsLoaded && <Sound url={tracks[2].track.preview_url} playStatus={Sound.status.PLAYING}/>}
      </div>
      {/* <Button>Contenu du bouton</Button> */}
    </div>
  );
}

export default App;