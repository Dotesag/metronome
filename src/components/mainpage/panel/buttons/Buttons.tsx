import { useContext } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";
import Stopwatch from "./stopwatch/Stopwatch";
import ChooseTempo from "./chooseTempo/ChooseTempo";

export default function Buttons() {
  const { playingTime, isPlaying, setIsPlaying } = useContext(MetronomeContext);

  return (
    <section className="grid grid-cols-2 grid-rows-2 gap-7 my-7">
      <Stopwatch />
      <button className="panelButton">Размер</button>
      <ChooseTempo />
      <button className="panelButton">Ритм</button>
    </section>
  );
}
