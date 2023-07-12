import React, { useState, useEffect } from 'react';
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

const AudioSliderApp = () => {
  useEffect(() => {
    ReactGA.initialize('G-SQGQ56KHNZ'); // Your Google Analytics tracking ID
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const [volumes, setVolumes] = useState({});
  const [audioFiles, setAudioFiles] = useState([
    { id: 1, volume: 0, src: rain, imgSrc: rainlogo },
    { id: 2, volume: 0, src: brownnoise, imgSrc: brownnoiselogo },
    { id: 3, volume: 0, src: laughter, imgSrc: laughterlogo},
    { id: 4, volume: 0, src: waves, imgSrc: waveslogo },
    { id: 5, volume: 0, src: bonfire, imgSrc: bonfirelogo },
    { id: 6, volume: 0, src: leaves, imgSrc: leaveslogo },
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

  const [sliderValue, setSliderValue] = useState(0);
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
  {isStarted && audioFiles.map((audioFile, index) => {
  let positionX = 0;
  let positionY = 0;

  if (isMobile) {
    // Stack sliders vertically in the mobile view
    positionY = index * 100; // Change this as per your design
  } else {
    // Arrange sliders in a circle in the desktop view
    const angle = (index * 360) / audioFiles.length;
    if (index === 0 || index === 5 || index === 1) {
      positionX = 200 * Math.cos((angle * Math.PI) / 180) + 250;
      positionY = 150 * Math.sin((angle * Math.PI) / 180);
    } else {
      positionX = 200 * Math.cos((angle * Math.PI) / 180) - 250;
      positionY = 150 * Math.sin((angle * Math.PI) / 180);
    }
  }

  const transform = `translate(${positionX}px, ${positionY}px)`;
            const volume = volumes[audioFile.id] || 0;
          
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
                    setSliderValue(Math.round(value * 50));
                  }}
                  className="input-thumb"
                  style={sliderStyle} 
                />
                <br />
                
                <AudioPlayer
                  src={audioFile.src}
                  volume={volume / 100}
                  autoPlay
                  loop={true}
                  controls={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default AudioSliderApp;
