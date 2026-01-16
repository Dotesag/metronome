import { useContext, useState } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";
import WheelPicker from "./wheelPicker/WheelPicker";

const dataScale1 = Array.from({ length: 16 }, (_, i) => i + 1);
const dataScale2 = Array.from({ length: 4 }, (_, i) => 2 ** i);

export default function Scale() {
  const { scale1, setScale1, scale2, setScale2 } = useContext(MetronomeContext);

  const [chooseScale, setChooseScale] = useState(false);

  const handleOpen = () => {
    setChooseScale(true);
  };

  const handleClose = () => {
    setChooseScale(false);
  };

  const handleChangeScale1 = (target) => {
    setScale1(target.value);
  };

  return (
    <div className={`relative bg-[#f5f5f5] rounded-full text-lg sm:w-50 w-45 h-20 `}>
      {!chooseScale && (
        <button
          className="p-6 flex justify-around w-full cursor-pointer rounded-full"
          onClick={handleOpen}
        >
          <p>Размер</p>
          <p>
            {scale1}/{scale2}
          </p>
        </button>
      )}
      <div
        className={`absolute left-0 top-0 bg-[#f5f5f5] rounded-[2.5rem] sm:w-50 w-45 overflow-hidden duration-250 z-100
          ${
            chooseScale
              ? "h-47 opacity-100 pointer-events-auto"
              : "h-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="h-full py-5 flex flex-col items-center justify-between">
          <p>Выберите размер</p>
          <div className="flex w-3/5 justify-around items-center">
            <WheelPicker
              items={dataScale1}
              activeElem={scale1}
              changeFunc={setScale1}
            />
            <p>/</p>
            <WheelPicker
              items={dataScale2}
              activeElem={scale2}
              changeFunc={setScale2}
            />
          </div>
          <button onClick={handleClose} className="cursor-pointer">
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
