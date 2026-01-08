import { useContext } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function Buttons() {
  const { playingTime, isPlaying } = useContext(MetronomeContext);

  return (
    <section className="grid grid-cols-2 grid-rows-2 gap-7 my-7">
      <button className="panelButton flex flex-col items-center">
        <p
          className={`font-semibold textl-2x ${
            isPlaying ? "-translate-y-1/2" : ""
          }`}
        >
          {!isPlaying ? "Начать" : "Закончить"}
        </p>
        {isPlaying && (
          <p className="absolute translate-y-1/2">
            {playingTime / 60}:{playingTime % 60}
          </p>
        )}
      </button>
      <button className="panelButton">Размер</button>
      <button className="panelButton">Подобрать темп</button>
      <button className="panelButton">Ритм</button>
    </section>
  );
}
