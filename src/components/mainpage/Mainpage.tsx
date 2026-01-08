"use client";
import { useState, createContext } from "react";

import Metrics from "./metrics/Metrics";
import Metronome from "./metronome/Metronome";
import Panel from "./panel/Panel";

export const MetronomeContext = createContext(undefined);

export default function Main() {
  const [BPM, setBPM] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const [scale1, setScale1] = useState(4);
  const [scale2, setScale2] = useState(4);

  return (
    <div className="flex flex-col pt-24">
      <MetronomeContext.Provider
        value={{ BPM, setBPM, isPlaying, setIsPlaying, scale1, playingTime }}
      >
        <Metrics />
        <Metronome />
        <Panel />
      </MetronomeContext.Provider>
    </div>
  );
}
