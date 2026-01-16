import Stopwatch from "./stopwatch/Stopwatch";
import ChooseTempo from "./chooseTempo/ChooseTempo";
import Scale from "./scale/Scale";
import Rhythm from "./rhythm/Rhythm";

export default function Buttons() {
  return (
    <section className="grid grid-rows-2 grid-cols-2 sm:gap-7 gap-5 my-7">
      <Stopwatch />
      <Scale />
      <ChooseTempo />
      <Rhythm />
    </section>
  );
}
