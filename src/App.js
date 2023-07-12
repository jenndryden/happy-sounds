import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import logomobile from './logomobile.png';
import name from './jenn.png';
import rain from './rain.mp3';
import brownnoise from './brownnoise.mp3';
import leaves from './leaves.mp3';
import laughter from './laughter.mp3';
import waves from './waves.mp3';
import bonfire from './bonfire.mp3';
import AudioPlayer from 'react-audio-player';
import rainlogo from './audionames/rain.png';
import laughterlogo from './audionames/laughter.png';
import leaveslogo from './audionames/leaves.png';
import waveslogo from './audionames/waves.png';
import brownnoiselogo from './audionames/brownnoise.png';
import bonfirelogo from './audionames/bonfire.png';
import ReactGA from 'react-ga';

const sliderStyle = {
  WebkitAppearance: 'none',
  background: 'white',
  height:'10px',
  width: '90%',
  maxWidth: '500px',
  outline: 'none',
  borderRadius: '25px',
  opacity: '0.9',
};

const AudioSliderItem = ({ audioFile, handleSliderChange, volume, isMobile, index, audioFilesLength }) => {
  const playerRef = useRef();

  useEffect(() => {
    if (audioFile.isPlaying) {
      playerRef.current.audioEl.current.play();
    } else {
      playerRef.current.audioEl.current.pause();
    }
  }, [audioFile.isPlaying]);

  let positionX = 0;
  let positionY = 0;

  if (isMobile) {
    positionY = index * 100; 
  } else {
    const angle = (index * 360) / audioFilesLength;
    if (index === 0 || index === 5 || index === 1) {
      positionX = 200 * Math.cos((angle * Math.PI) / 180) + 250;
      positionY = 150 * Math.sin((angle * Math.PI) / 180);
    } else {
      positionX = 200 * Math.cos((angle * Math.PI) / 180) - 250;
      positionY = 150 * Math.sin((angle * Math.PI) / 180);
    }
  }

  const transform = `translate(${positionX}px, ${positionY}px)`;

  return (
    <div key={audioFile.id} className="slider" style={{ transform }}>
      <img src={audioFile.imgSrc} alt={audioFile.imgSrc} className="audiologo" />
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => handleSliderChange(audioFile.id, e.target.value)}
        onInput={(e) => {
          const value = Number(e.target.value) / 100;
          e.target.style.setProperty('--thumb-rotate', `${value * 720}deg`);
        }}
        className="input-thumb"
        style={sliderStyle} 
      />
      <br />
      
      <AudioPlayer
        ref={playerRef} 
        src={audioFile.src}
        volume={volume / 100}
        loop={true}
        controls={false}
      />
    </div>
  );
};

const AudioSliderApp = () => {
  useEffect(() => {
    ReactGA.initialize('G-SQGQ56KHNZ'); 
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const [volumes, setVolumes] = useState({});
  const [audioFiles, setAudioFiles] = useState([
    { id: 1, volume: 0, src: rain, imgSrc: rainlogo, isPlaying: false },
    { id: 2, volume: 0, src: brownnoise, imgSrc: brownnoiselogo, isPlaying: false },
    { id: 3, volume: 0, src: laughter, imgSrc: laughterlogo, isPlaying: false},
    { id: 4, volume: 0, src: waves, imgSrc: waveslogo, isPlaying: false },
    { id: 5, volume: 0, src: bonfire, imgSrc: bonfirelogo, isPlaying: false },
    { id: 6, volume: 0, src: leaves, imgSrc: leaveslogo, isPlaying: false },
  ]);

  const handleSliderChange = (id, volume) => {
    setAudioFiles((prevAudioFiles) =>
      prevAudioFiles.map((audioFile) =>
        audioFile.id === id ? { ...audioFile, volume, isPlaying: Number(volume) !== 0 } : audioFile
      )
    );
    setVolumes((prevVolumes) => ({
      ...prevVolumes,
      [id]: volume
    }));
  };

  const [isStarted, setIsStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  const startAudio = () => {
    setIsStarted(true);
  };

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1200);
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


  return (
    <div className="container">
      <img src={isMobile ? logomobile : logo} alt="Logo" className="logo" />
      <div className="jenn-logo" onClick={() => window.open("http://www.jenndryden.com", "_blank")}></div>
      <div className={`circle ${isMobile ? 'mobile' : ''}`}>
      {!isStarted && <div className="sprite-button" onClick={startAudio}>
  </div>}
  {isStarted && audioFiles.map((audioFile, index) => (
    <AudioSliderItem
      key={audioFile.id}
      audioFile={audioFile}
      handleSliderChange={handleSliderChange}
      volume={volumes[audioFile.id] || 0}
      isMobile={isMobile}
      index={index}
      audioFilesLength={audioFiles.length}
    />
  ))}
        </div>
      </div>
    );
};

export default AudioSliderApp;
