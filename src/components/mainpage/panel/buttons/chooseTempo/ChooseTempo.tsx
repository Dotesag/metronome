import { useContext, useRef } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function ChooseTempo() {
  const { setBPM } = useContext(MetronomeContext);
  const lastClickTime = useRef<number | null>(null);

  const handleClick = () => {
    var period = Math.floor(
      60 / ((performance.now() - lastClickTime.current) / 1000)
    );
    if (!lastClickTime || period < 1) {
      lastClickTime.current = performance.now();
    } else {
      setBPM(Math.min(period, 250));
      lastClickTime.current = performance.now();
    }
  };

  return (
    <button className="panelButton cursor-pointer" onClick={handleClick}>
      Выбрать темп
    </button>
  );
}
