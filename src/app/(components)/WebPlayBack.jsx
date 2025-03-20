'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import DieLit from '/public/assets/Die_Lit.jpg';
import { Howl } from 'howler';

export default function WebPlayBack(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const tracks = props.trackS;

  // Use useRef to store the Howl instance
  const soundRef = useRef(null);

  useEffect(() => {
    // Initialize the Howl instance
    soundRef.current = new Howl({
      src: ['/assets/LONG-TIME.mp3'],
      html5: true,
      loop: true,
      volume: 0.5,
      onend: function() {
        console.log('Finished!');
      }
    });

    // Cleanup function to stop the sound when the component unmounts
    return () => {
      soundRef.current.stop();
    };
  }, []);

  function handlePlay() {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    if (newIsPlaying) {
      soundRef.current.play();
    } else {
      soundRef.current.pause(); 
    }
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
    // Play the sound when the track index changes
    if (isPlaying) {
      soundRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

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
          <span className='ml-2 text-xxs text-[#727270]'>0:43</span>
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
            <div className='flex items-center'>
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
