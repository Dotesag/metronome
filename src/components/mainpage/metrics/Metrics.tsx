import { useContext, useEffect, useState } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function Metrics() {
  const { BPM } = useContext(MetronomeContext);
  const [tempo, setTempo] = useState("Moderato");

  const tempos = {
    40: "Grave",
    60: "Largo",
    66: "Larghetto",
    76: "Adagio",
    84: "Andante",
    108: "Moderato",
    120: "Allegretto",
    140: "Allegro",
    176: "Vivace",
    200: "Presto",
    512: "Prestissimo",
  };

  const getTempo = (BPM) => {
    for (const key in tempos) {
      if (BPM < key) {
        setTempo(tempos[key]);
        return;
      }
    }
    setTempo(tempos[Object.keys(tempos).at(-1)]);
  };

  useEffect(() => {
    getTempo(BPM);
  });

  return (
    <div className="flex flex-col items-center w-full ">
      <p className="sm:text-[10em]/29 text-[8em]/23 font-medium">{BPM}</p>
      <p className="text-xl font-medium text-[#3F3F3F]">BPM</p>
      <p className="text-md text-[#636363]">{tempo}</p>
    </div>
  );
}
