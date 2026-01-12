import { useContext, useState } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";
import WheelPicker from "react-simple-wheel-picker";

const dataScale1 = Array.from({ length: 16 }, (_, i) => ({
  id: String(i + 1),
  value: String(i + 1),
}));

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
    <div className={`relative bg-[#f5f5f5] rounded-full text-lg w-50 h-20 `}>
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
        <div className="h-full py-5 flex flex-col items-center justify-between">
          <p>Выберите размер</p>
          <div className="flex w-3/5 justify-around items-center">
            <WheelPicker
              data={dataScale1}
              onChange={handleChangeScale1}
              height={150}
              width={100}
              titleText="Enter value same as aria-label"
              itemHeight={30}
              selectedID={dataScale1[0].id}
              color="#ccc"
              activeColor="#333"
            />
            <p>/</p>
            <div className="flex h-20 flex-col">
              <button>+</button>
              {scale2}
              <button>-</button>
            </div>
          </div>
          <button onClick={handleClose} className="cursor-pointer">
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
