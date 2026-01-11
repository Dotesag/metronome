import { useContext, useState } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

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
    <div
      className={`relative bg-[#f5f5f5] rounded-full  text-xl w-50 h-20 `}
    >
      <div className="">
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
        {chooseScale && (
          <div className="absolute bg-[#f5f5f5] rounded-[2.5rem] text-dxl w-50 h-47 flex flex-col items-center justify-around">
            <p>Выберите</p>
            <button onClick={handleClose} className="cursor-pointer">
              Готово
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
