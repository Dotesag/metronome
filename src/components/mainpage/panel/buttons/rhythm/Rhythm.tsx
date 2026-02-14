import { useContext, useEffect, useState } from "react";
import { MetronomeContext } from "components/mainpage/Mainpage";

export default function Rhythm() {
  const { scale2 } = useContext(MetronomeContext);
  const [chooseRhythm, setChooseRhythm] = useState(false);
  const [images, setImages] = useState([]);

  const handleOpen = () => {
    setChooseRhythm(true);
  };

  const handleClose = () => {
    setChooseRhythm(false);
  };

  useEffect(() => {
    fetch(`api/notes_images?folder=${scale2}`)
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, [scale2]);

  return (
    <div
      className={`relative bg-[#f5f5f5] rounded-full text-lg sm:w-50 w-45 h-20 `}
    >
      {!chooseRhythm && (
        <button
          className="p-6 flex justify-around w-full cursor-pointer rounded-full"
          onClick={handleOpen}
        >
          <p>Ритм</p>
        </button>
      )}
      <div
        className={`absolute left-0 top-0 bg-[#f5f5f5] rounded-[2.5rem] sm:w-50 w-45 overflow-hidden duration-250 z-90
                   ${
                     chooseRhythm
                       ? "h-47 opacity-100 pointer-events-auto"
                       : "h-0 opacity-0 pointer-events-none"
                   }`}
      >
        <div className="h-full py-5 flex flex-col items-center justify-between">
          <p>Выберите ритм</p>
          <div className="flex w-3/5 justify-around items-center">
            {images.map((img, ind) => (
              <img key={ind} src={"./icons/notes/" + scale2 + "/" + img} className="w-12"></img>
            ))}
          </div>
          <button onClick={handleClose} className="cursor-pointer">
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
