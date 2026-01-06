import { useContext, useEffect, useState } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function Metronome() {
  const { scale1 } = useContext(MetronomeContext);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-center mt-5 gap-7">
        {Array.from({ length: scale1 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 bg-[#D9D9D9] rounded-full"
          ></div>
        ))}
      </div>

      <div className="mt-6">
        <div className="w-76 h-2 bg-[#D9D9D9] rounded-full"/>
        <div className="w-7 h-7 bg-[#BABABA] rounded-full relative bottom-4.5"/>
      </div>
    </div>
  );
}
