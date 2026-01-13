import { useState, useEffect, useRef } from "react";

type WheelPickerProps = {
  items: number[];
  activeElem: number;
  changeFunc: (value: number) => void;
};

export default function WheelPicker({
  items,
  activeElem,
  changeFunc,
}: WheelPickerProps) {
  const ITEM_HEIGHT = 28;
  const DRAG_THRESHOLD = 5;
  const [offset, setOffset] = useState(ITEM_HEIGHT * items.indexOf(activeElem));
  const offsetRef = useRef(ITEM_HEIGHT * items.indexOf(activeElem));
  const clientStartY = useRef(0);
  const Ypos = useRef(0);
  const frameRef = useRef(0);
  const isDragging = useRef(false);
  const didDrag = useRef(false);

  const setActive = (ind) => {
    changeFunc(items[ind]);
    setOffset(ITEM_HEIGHT * ind);
  };

  useEffect(() => {
    const newOffset = ITEM_HEIGHT * items.indexOf(activeElem);
    setOffset(newOffset);
    offsetRef.current = newOffset;
  }, [activeElem, items]);

  const handleYMove = (event) => {
    Ypos.current = event.clientY;
  };

  const beginDragging = (event) => {
    if (isDragging.current) return;
    isDragging.current = true;
    didDrag.current = false;

    Ypos.current = event.clientY;
    clientStartY.current = event.clientY;

    window.addEventListener("pointermove", handleYMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    clientStartY.current = Ypos.current;
    dragOffset();
  };

  const dragOffset = () => {
    frameRef.current = requestAnimationFrame(() => {
      const delta = Ypos.current - clientStartY.current;
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        didDrag.current = true;
      }
      if (delta != 0) {
        offsetRef.current -= delta;
        setOffset(offsetRef.current);
        clientStartY.current = Ypos.current;
      }
      dragOffset();
    });
  };

  const stopDragging = () => {
    window.removeEventListener("pointerup", stopDragging);
    window.removeEventListener("pointercancel", stopDragging);
    window.removeEventListener("pointermove", handleYMove);
    cancelAnimationFrame(frameRef.current);
    const nearestIndex = Math.round(offsetRef.current / ITEM_HEIGHT);
    isDragging.current = false;
    didDrag.current = false;

    setActive(Math.max(0, Math.min(nearestIndex, items.length - 1)));
  };

  return (
    <div
      className="h-21 overflow-hidden"
      onPointerDown={beginDragging}
      style={{ touchAction: "none" }}
    >
      <div
        style={{
          transform: `translateY(calc(-${offset}px + ${ITEM_HEIGHT}px))`,
          transitionDuration: `${isDragging.current ? "0ms" : "250ms"}`,
        }}
      >
        {items.map((item, index) => (
          <p
            key={index}
            className="h-7 w-7 flex justify-center items-center cursor-pointer noselect"
            onClick={() => {
              if (!didDrag) {
                setActive(index);
              }
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
