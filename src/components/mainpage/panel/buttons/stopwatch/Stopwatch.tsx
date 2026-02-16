import { useContext, useEffect, useRef } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function Stopwatch() {
  const { playingTime, setPlayingTime, isPlaying, setIsPlaying } =
    useContext(MetronomeContext);
  const startTime = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      startTime.current = performance.now();
      tick();
    }
    if (!isPlaying) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      startTime.current = null;
    }
  }, [isPlaying]);

  function tick() {
    frameRef.current = requestAnimationFrame(() => {
      if (isPlaying) {
        setPlayingTime(
          Math.floor((performance.now() - startTime.current) / 1000),
        );
      }
      tick();
    });
  }

  return (
    <button
      className="panelButton flex flex-col items-center justify-center cursor-pointer "
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <p
        className={`font-semibold text-xl duration-100 h-full ${
          isPlaying ? "-translate-y-1/3" : ""
        }`}
      >
        {!isPlaying ? "Начать" : "Закончить"}
      </p>
      <p
        className={`absolute ${isPlaying ? "translate-y-1/2 opacity-100" : " opacity-0"} duration-100`}
      >
        {String(Math.floor(playingTime / 60)).padStart(2, "0")}:
        {String(playingTime % 60).padStart(2, "0")}
      </p>
    </button>
  );
}
