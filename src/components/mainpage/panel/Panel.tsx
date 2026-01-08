import Buttons from "./buttons/Buttons";
import RangeBPM from "./rangeBPM/RangeBPM";

export default function Panel() {
  return (
    <section className="w-full flex flex-col items-center mt-6  px-10">
      <RangeBPM />
      <Buttons />
    </section>
  );
}
