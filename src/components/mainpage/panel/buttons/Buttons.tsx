import Stopwatch from "./stopwatch/Stopwatch";
import ChooseTempo from "./chooseTempo/ChooseTempo";
import Scale from "./scale/Scale";

export default function Buttons() {
  return (
    <section className="grid grid-rows-2 grid-cols-2 gap-7 my-7">
      <Stopwatch />
      <Scale />
      <ChooseTempo />
      <button className="panelButton cursor-pointer">Ритм</button>
    </section>
  );
}
