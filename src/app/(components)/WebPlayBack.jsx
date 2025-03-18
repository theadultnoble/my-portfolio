'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import DieLit from '/public/assets/Die_Lit.jpg';

export default function WebPlayBack(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const tracks = props.trackS;

  function handlePlay() {
    setIsPlaying(!isPlaying);
  }

  const handleNextTrack = () => {
    if (tracks && currentTrackIndex < tracks.items.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const handlePreviousTrack = () => {
    if (tracks && currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const currentTrack = tracks?.items[currentTrackIndex]?.track;
  const trackImage = currentTrack?.album.images[0]?.url || DieLit;
  const trackName = currentTrack?.name || 'No track';
  const artistName = currentTrack?.artists[0]?.name || 'Unknown artist';

  useEffect(() => {
    
    
    // if (window.Spotify) return initPlayer(); // If SDK is already loaded

    // const script = document.createElement('script');
    // script.src = 'https://sdk.scdn.co/spotify-player.js';
    // script.async = true;
    // document.body.appendChild(script);
    // // Load Script check
    // script.onerror = () => console.error('Spotify SDK failed to load');
    // window.onSpotifyWebPlaybackSDKReady = initPlayer;

    // function initPlayer() {
    //   if (!window.Spotify) return console.error('Spotify SDK unavailable');

    //   const token = props.access_token;
    //   const player = new Spotify.Player({
    //     name: 'Web Playback SDK Quick Start Player',
    //     getOAuthToken: (cb) => {
    //       cb(token);
    //     },
    //     volume: 0.5,
    //   });

    //   player.addListener('ready', ({ device_id }) => {
    //     console.log('Ready with Device ID', device_id);
    //   });

    //   // Not Ready
    //   player.addListener('not_ready', ({ device_id }) => {
    //     console.log('Device offline', device_id);
    //   });

    //   player.addListener('initialization_error', ({ message }) => {
    //     console.error(message);
    //   });

    //   //Connect Player
    //   player
    //     .connect()
    //     .then((success) => {
    //       if (success) {
    //         console.log(
    //           'The Web Playback SDK successfully connected to Spotify!'
    //         );
    //       }
    //     })
    //     .catch((error) => console.log('Error:', error));

    //   setPLay(player);

    //   player.addListener('player_state_changed', (state) => {
    //     if (!state) {
    //       console.error(
    //         'User is not playing music through the Web Playback SDK'
    //       );
    //       return;
    //     }
    //     setCurrentTrack(state.track_window.current_track);
    //     setNextTrack(state.track_window.next_tracks[0]);
    //     setPrevTrack(state.track_window.previous_tracks[0]);
    //     setIsPlaying(!state.paused);
    //     console.log('Currently playing:', currentTrack);
    //   });
    // }
  }, []);

  return (
    <div className='overflow-hidden flex mt-3'>
      <Image
        src={trackImage}
        width={150}
        height={150}
        className='rounded-md border border-[#e4e3e0]'
        alt={'Track image'}
      />
      <div className='ml-5 space-y-4 flex flex-col justify-end w-full h-40'>
        <div>
          <p className='text-[#464644] text-base font-medium'>
            {trackName}
          </p>
          <p className='text-xs'>
            {artistName}
          </p>
        </div>
        <div className='flex items-center'>
          <div className='h-1 bg-[#E9E8E6] rounded-full flex-1'>
            <div className='h-full bg-[#727270] w-1/4 rounded-full'></div>
          </div>
          <span className='ml-2 text-xxs text-[#727270]'>0:00</span>
        </div>
        <div className='grid grid-cols-3 gap-x-6'>
          <button onClick={handlePreviousTrack}>
            <Icon
              icon='fluent:previous-48-filled'
              style={{ color: '#4a4a4a' }}
              width={15}
            />
          </button>
          <button onClick={handlePlay}>
            <Icon
              icon={isPlaying ? 'fluent:pause-24-filled' : 'fluent:play-24-filled'}
              style={{ color: '#4a4a4a' }}
              width={14}
            />
          </button>
          <button onClick={handleNextTrack}>
            <Icon
              icon='fluent:next-48-filled'
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
          <div className='w-full ml-2'>
            <div className='flex  items-center'>
            <div className='h-1 bg-[#E9E8E6] rounded-full flex-1'>
            <div className='h-full bg-[#727270] w-1/4 rounded-full'></div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
