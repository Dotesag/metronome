import { useContext, useEffect, useState, useRef } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function Metronome() {
  const { scale1, BPM, isPlaying } = useContext(MetronomeContext);

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  async function play() {
    if (!audioContextRef.current) return;

    const response = await fetch("./audio/metronome.mp3");
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContextRef.current.decodeAudioData(
      arrayBuffer
    );

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    source.start();
  }

  useEffect(() => {
    audioContextRef.current = new AudioContext();

    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const interval = 60000 / BPM;
    intervalRef.current = setInterval(() => {
      play();
    }, interval);

    return () => {
      audioContextRef.current?.close();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, BPM]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-center mt-5 gap-7">
        {Array.from({ length: scale1 }).map((_, i) => (
          <div key={i} className="w-10 h-10 bg-[#D9D9D9] rounded-full"></div>
        ))}
      </div>

      <div className="mt-6">
        <div className="w-76 h-1 bg-[#D9D9D9] rounded-full" />
        <div className="w-4 h-4 bg-[#BABABA] rounded-full relative bottom-2.5" />
      </div>
    </div>
  );
}
