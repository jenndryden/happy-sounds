import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';
import AudioPlayer from 'react-audio-player';

const AudioSliderApp = () => {
  const [volumes, setVolumes] = useState({});
  const [audioFiles, setAudioFiles] = useState([
    { id: 1, volume: 0, src: '/rain.mp3' },
    { id: 2, volume: 0, src: '/brownnoise.mp3' },
    { id: 3, volume: 0, src: '/rain.mp3'},
    { id: 4, volume: 0, src: '/rain.mp3' },
    { id: 5, volume: 0, src: '/rain.mp3' },
    { id: 6, volume: 0, src: '/rain.mp3'},
  ]);

  const handleSliderChange = (id, volume) => {
    setAudioFiles((prevAudioFiles) =>
      prevAudioFiles.map((audioFile) =>
      audioFile.id === id ? { ...audioFile, volume } : audioFile
      )
    );
    setVolumes((prevVolumes) => ({
      ...prevVolumes,
      [id]: volume
    }));
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <div className="circle">
        {audioFiles.map((audioFile, index) => {
          const angle = (index * 360) / audioFiles.length;
          let positionX = 0;
          let positionY = 0;
          if (index === 0 || index === 5 || index === 1) {
            positionX = 200 * Math.cos((angle * Math.PI) / 180) + 250;
           positionY = 150 * Math.sin((angle * Math.PI) / 180);
          }
          else {
            positionX = 200 * Math.cos((angle * Math.PI) / 180) -250;
            positionY = 150 * Math.sin((angle * Math.PI) / 180);
          }
          const transform = `translate(${positionX}px, ${positionY}px)`;
            const volume = volumes[audioFile.id] || 0;
          
            return (
              <div key={audioFile.id} className="slider" style={{ transform }}>
                <p>Audio File {audioFile.id}</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleSliderChange(audioFile.id, e.target.value)}
                />
                <br />
                <AudioPlayer
                  src={audioFile.src}
                  volume={volume / 100}
                  autoPlay={true}
                  controls={true}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AudioSliderApp;
