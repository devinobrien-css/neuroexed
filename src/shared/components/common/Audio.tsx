import { useEffect, useRef } from 'react';

type AudioProps = {
  audioBlob: Blob;
};

const Audio = ({ audioBlob }: AudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioUrl = URL.createObjectURL(audioBlob);

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
    }
  }, [audioBlob]);

  return (
    <audio controlsList="nodownload" ref={audioRef} controls>
      Your browser does not support the audio element.
    </audio>
  );
};

export default Audio;
