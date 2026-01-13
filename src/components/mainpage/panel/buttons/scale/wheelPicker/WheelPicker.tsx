import { useState, useEffect } from "react";

type WheelPickerProps = {
  items: number[];
  activeElem: number;
  changeFunc: Function;
};

export default function WheelPicker({
  items,
  activeElem,
  changeFunc,
}: WheelPickerProps) {
  const ITEM_HEIGHT = 28;
  const [offset, setOffset] = useState(ITEM_HEIGHT * items.indexOf(activeElem));

  const setActive = (ind) => {
    changeFunc(items[ind]);
    setOffset(ITEM_HEIGHT * ind);
  };

  useEffect(() => {
    setOffset(ITEM_HEIGHT * items.indexOf(activeElem));
  }, [activeElem, items]);

  return (
    <div className="h-21 overflow-hidden">
      <div
        style={{
          transform: `translateY(calc(-${offset}px + ${ITEM_HEIGHT}px))`,
        }}
        className="duration-250"
      >
        {items.map((item, index) => (
          <p
            key={index}
            className="h-7 w-7 flex justify-center items-center cursor-pointer noselect"
            onClick={() => setActive(index)}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
