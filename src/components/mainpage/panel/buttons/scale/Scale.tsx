import { useContext, useState } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";
import { openAsBlob } from "node:fs";

export default function Scale() {
  const { scale1, scale2 } = useContext(MetronomeContext);

  const [chooseScale, setChooseScale] = useState(false);

  const handleOpen = () => {
    setChooseScale(true);
  };

  const handleClose = () => {
    setChooseScale(false);
  };

  return (
    <div className={`relative bg-[#f5f5f5] rounded-full text-xl w-50 h-20 `}>
      {!chooseScale && (
        <button
          className="p-6 flex justify-around w-full cursor-pointer"
          onClick={handleOpen}
        >
          <p>Размер</p>
          <p>
            {scale1}/{scale2}
          </p>
        </button>
      )}
      <div
        className={`absolute left-0 top-0 bg-[#f5f5f5] rounded-[2.5rem] w-50 overflow-hidden duration-250 
          ${
            chooseScale
              ? "h-47 opacity-100 pointer-events-auto"
              : "h-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="h-full py-6 flex flex-col items-center justify-between">
          <p>Выберите размер</p>
          <p>
            {scale1}/{scale2}
          </p>
          <button onClick={handleClose} className="cursor-pointer">
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
