import { useContext, useRef } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function ChooseTempo() {
  const { setBPM } = useContext(MetronomeContext);
  const lastClickTime = useRef<number | null>(null);

  const handleClick = () => {
    if (!lastClickTime) {
      lastClickTime.current = performance.now();
    } else {
      setBPM(
        Math.min(Math.floor(60 / ((performance.now() - lastClickTime.current) / 1000)), 250)
      );
      lastClickTime.current = performance.now();
    }
  };

  return (
    <button className="panelButton" onClick={handleClick}>
      Подобрать темп
    </button>
  );
}
