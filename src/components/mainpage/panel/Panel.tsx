"use client";
import "./Panel.css";
import { useContext } from "react";

import { MetronomeContext } from "components/mainpage/Mainpage";

export default function Panel() {
  const { BPM, setBPM } = useContext(MetronomeContext);
  const maxBPM = 250;

  const handleMinus = () => {
    if (BPM > 1) {
      setBPM(BPM - 1);
    }
  };

  const handlePlus = () => {
    if (BPM < maxBPM) {
      setBPM(BPM + 1);
    }
  };

  return (
    <section className="w-full flex flex-col items-center mt-6  px-10">
      <div className="flex w-full max-w-256 justify-between items-center gap-8">
        <button
          onClick={handleMinus}
          className="w-12 h-12  bg-[#87CEFA] rounded-full flex justify-center items-center shrink-0"
        >
          <img src="./icons/minus.svg" className="w-4.5" alt="-" />
        </button>

        <input
          id="BPMrange"
          type="range"
          value={BPM}
          min="1"
          max={maxBPM}
          step="1"
          onChange={(e) => setBPM(Number(e.target.value))}
          className="w-full h-2.5"
          style={{
            background: `linear-gradient(to right, #87CEFA 0%, #87CEFA ${
              ((BPM - 1) / (maxBPM - 1)) * 100
            }%, #D9D9D9 ${((BPM - 1) / (maxBPM - 1)) * 100}%, #D9D9D9 100%)`,
          }}
        />

        <button
          onClick={handlePlus}
          className="w-12 h-12 bg-[#87CEFA] rounded-full flex justify-center items-center shrink-0"
        >
          <img src="./icons/plus.svg" className="w-4.5" alt="+" />
        </button>
      </div>
    </section>
  );
}
