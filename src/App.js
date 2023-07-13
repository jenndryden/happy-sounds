import React, { useState, useEffect, useRef } from 'react';
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

const TRACKING_ID = "G-SQGQ56KHNZ"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const AudioSliderApp = () => {
  const [volumes, setVolumes] = useState({});
  const [audioFiles, setAudioFiles] = useState([
    { id: 1, volume: 0, src: rain, imgSrc: rainlogo },
    { id: 2, volume: 0, src: brownnoise, imgSrc: brownnoiselogo },
    { id: 3, volume: 0, src: laughter, imgSrc: laughterlogo },
    { id: 4, volume: 0, src: waves, imgSrc: waveslogo },
    { id: 5, volume: 0, src: bonfire, imgSrc: bonfirelogo },
    { id: 6, volume: 0, src: leaves, imgSrc: leaveslogo },
  ]);
  const audioRefs = useRef([]);

  const handleSliderChange = (id, volume) => {
    const audioElement = audioRefs.current[id - 1];
    audioElement.volume = volume / 100;

    if (volume > 0 && audioElement.paused) {
      audioElement.play();
    } else if (volume === 0 && !audioElement.paused) {
      audioElement.pause();
    }

    setAudioFiles((prevAudioFiles) =>
      prevAudioFiles.map((audioFile) =>
        audioFile.id === id ? { ...audioFile, volume } : audioFile
      )
    );
    setVolumes((prevVolumes) => ({
      ...prevVolumes,
      [id]: volume,
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
    positionY = index * 100;
  } else {
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
      
      <audio
        ref={(el) => (audioRefs.current[index] = el)}
        src={audioFile.src}
        loop={true}
      />
    </div>
  );
})}
</div>
</div>
);
};

export default AudioSliderApp;
