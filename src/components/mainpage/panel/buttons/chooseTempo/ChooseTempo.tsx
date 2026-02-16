import { useContext, useRef, useState } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function ChooseTempo() {
  const { setBPM } = useContext(MetronomeContext);
  const lastClickTime = useRef<number | null>(null);
  const btnRef = useRef(null);

  const handleClick = () => {
    var period = Math.floor(
      60 / ((performance.now() - lastClickTime.current) / 1000),
    );
    if (!lastClickTime || period < 1) {
      lastClickTime.current = performance.now();
    } else {
      setBPM(Math.min(period, 250));
      lastClickTime.current = performance.now();
    }

    const btn = btnRef.current;
    btn.getAnimations().forEach((anim) => anim.cancel());
    btn.animate(
      [
        {
          width: "0px",
          height: "0px",
          opacity: 1,
        },
        {
          width: "230px",
          height: "230px",
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 140,
      },
    );
  };

  return (
    <button
      className={`panelButton cursor-pointer overflow-hidden relative flex items-center justify-center`}
      onClick={handleClick}
    >
      <p className="relative z-111">Выбрать темп</p>
      <div ref={btnRef} className={`absolute bg-[#eeeeee] rounded-full `}></div>
    </button>
  );
}
