import { useContext, useEffect, useState, useRef } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function Metronome() {
  const { scale1, BPM, isPlaying } = useContext(MetronomeContext);
  const [tick, setTick] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  async function loadBuffer() {
    if (!audioContextRef.current) return;
    const response = await fetch("./audio/metronome.mp3");
    const arrayBuffer = await response.arrayBuffer();
    audioBufferRef.current = await audioContextRef.current.decodeAudioData(
      arrayBuffer
    );
  }

  async function play() {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start();

    setTick((prev) => prev + 1);
  }

  useEffect(() => {
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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, BPM]);

  useEffect(() => {
    if (!isPlaying) {
      setTick(0);
    } else {
      play();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    loadBuffer();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const isActive = (i, scale1) => {
    if (i == tick % scale1) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-center mt-5 gap-7">
        {Array.from({ length: scale1 }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10  rounded-full duration-300 ${
              isActive(i, scale1) ? "bg-[#1E90FF]" : "bg-[#D9D9D9]"
            } `}
          ></div>
        ))}
      </div>

      <div className="mt-6">
        <div className="w-76 h-1 bg-[#D9D9D9] rounded-full translate-y-1/2" />
        <div
          className={`w-5 h-5 bg-[#1E90FF] rounded-full relative -translate-y-1/2 ease-linear`}
          style={{
            left: tick % 2 ? "calc(100% - var(--spacing) * 5)" : "0px",
            transition: `left ${
              isPlaying ? `${(60 / BPM) * 1000}ms` : "0ms"
            } linear`,
          }}
        />
      </div>
    </div>
  );
}
