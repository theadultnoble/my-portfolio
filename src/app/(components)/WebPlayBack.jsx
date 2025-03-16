'use client'
import {useEffect, useState } from 'react'
import Image from 'next/image';
import { Icon } from '@iconify/react';
import DieLit from '/public/assets/Die_Lit.jpg'

export default function WebPlayBack(props) {  
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, setPLay] = useState(undefined)
  
  // const [Player, setPlayer] = useState();
  //  const [playerState, setPlayerState] = useState({ trackIndex: 0, timestamp: 0, volume: 0.5 });
  function handlePlay(){
    setIsPlaying(!isPlaying)
    console.log(play)

  }

 useEffect(()=>{
    if (window.Spotify) return initPlayer(); // If SDK is already loaded

    const script =  document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    // Load Script check
    script.onload = initPlayer;
    script.onerror = () => console.error("Spotify SDK failed to load");
    window.onSpotifyWebPlaybackSDKReady = initPlayer;
    

    function initPlayer() {
      if(!window.Spotify) return console.error("Spotify SDK unavailable");

      const token = props.access_token;
      console.log(token)
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
    
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => console.error("Auth Error:", message));

      //Connect Player
      player.connect().then(success =>{
      if(success){
        console.log("The Web Playback SDK successfully connected to Spotify!")
      }
      }).catch(error => console.log('Error:', error));

      setPLay(player);
    }

    
  }, []);


  return (
    <div className='overflow-hidden flex mt-3'>
      <Image
        src={DieLit}
        width={150}
        height={160}
        className='rounded-md border border-[#e4e3e0]'
        alt="Die Lit by Playboi Carti"
      />
      <div className='ml-5 space-y-4 flex flex-col justify-end h-auto'>
        <div>
          <p className='text-[#464644] text-base font-medium'>{'Long Time (Intro)'}</p>
          <p className='text-xs'> PlayBoi Carti</p>
        </div>
        <div className='flex items-center'>
          <div className='h-1 bg-[#E9E8E6] rounded-full flex-1'>
            <div className='h-full bg-[#727270] w-1/4 rounded-full'></div>
          </div>
          <span className='ml-2 text-xxs text-[#727270]'>0:00</span>
        </div>
        <div className='grid grid-cols-3 gap-x-6'>
          <button>
            <Icon
              icon='fluent:next-48-filled'
              style={{ color: '#4a4a4a' }}
              width={15}
            />
          </button>
          <button onClick={() => {
           handlePlay()
          }}>
            <Icon
              icon={isPlaying ? 'fluent:pause-24-filled' : 'fluent:play-24-filled'}
              style={{ color: '#4a4a4a' }} // Darker color
              width={14}
            />
          </button>
          <button>
            <Icon
              icon='fluent:previous-48-filled'
              style={{ color: '#4a4a4a' }}
              width={15}
            />
          </button>
        </div>
        <div className='flex items-center'>
          <Icon
            icon='basil:volume-up-solid'
            style={{ color: '#727270' }}
            width={13}
          />
          <div className="relative w-full ml-2">
            <input
              type="range"
              min="0"
              max="100"
              className="w-full h-0.5 bg-[#E9E8E6] rounded-lg appearance-none"
              style={{ height: '0.25rem', cursor: 'none' }}
              onMouseDown={(e) => {
                e.target.style.cursor = 'pointer';
                e.target.style.setProperty('--thumb-color', '#5a5a5a'); // Darker color when sliding
              }}
              onMouseUp={(e) => {
                e.target.style.cursor = 'none';
                e.target.style.setProperty('--thumb-color', 'darkgrey'); // Reset color
              }}
              onMouseLeave={(e) => {
                e.target.style.cursor = 'none'; // Hide cursor when leaving
              }}
            />
            <div className="absolute top-0 left-0 h-2 bg-[#727270] rounded-full transition-all duration-200" style={{ width: '0%', transform: 'translateY(-50%)' }} />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 12px;
                height: 12px;
                background: var(--thumb-color, darkgrey);
                border-radius: 50%;
                cursor: none;
                transition: background 0.2s;
              }
              input[type="range"]:hover::-webkit-slider-thumb {
                cursor: pointer;
              }
              input[type="range"]:active::-webkit-slider-thumb {
                background: #5a5a5a; /* Darker color when sliding */
              }
              input[type="range"]::-moz-range-thumb {
                width: 12px;
                height: 12px;
                background: var(--thumb-color, darkgrey);
                border-radius: 50%;
                cursor: none;
                transition: background 0.2s;
              }
              input[type="range"]:hover::-moz-range-thumb {
                cursor: pointer;
              }
              input[type="range"]:active::-moz-range-thumb {
                background: #5a5a5a; /* Darker color when sliding */
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  )
}
