import { useEffect, useState, useRef } from "react";
import useResourcesStore, { EventsType } from "../../Others/Store";

export default function Event({
  i,
  res_name,
  ev,
}: {
  i: number;
  res_name: string;
  ev: EventsType;
}) {
  const { currentMonthIndex, setSelectedEvent, setResources, resources } =
    useResourcesStore();
  const [randomColor, setRandomColor] = useState("");
  const [selected, setSelected] = useState(false);
  const eventName = ev.events[0];
  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);
  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256); 
    const green = Math.floor(Math.random() * 256); 
    const blue = Math.floor(Math.random() * 256); 

    return "rgb(" + red + ", " + green + ", " + blue + ")";
  };

  useEffect(() => {
    if (selected) handleDelete(eventName);
    setSelected(false);
  }, [selected]);
  const handleDelete = (event: string) => {
    document.addEventListener("keydown", (e) => {
      console.log(selected, e.key);
      if (selected && e.key === "Delete") {
        const updatedResources = resources.map((res) => {
          if (res.res_name === res_name) {
            res.res_data = res.res_data.filter((d) => d.events[0] !== event);
          }
          return res;
        });
        alert("Event Deleted");
        setResources(updatedResources);
        localStorage.setItem("allResources", JSON.stringify(updatedResources));
      }
    });
  };
  const [width, setWidth] = useState(ev.width); // Default width
  const resizableRef = useRef(null);

  const handleMouseDown = (direction: "left" | "right", event: MouseEvent) => {
    event.preventDefault();
    const startX = event.clientX;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const startWidth = resizableRef.current.offsetWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth =
        startWidth +
        (direction === "right"
          ? moveEvent.clientX - startX
          : startX - moveEvent.clientX);
      const updatedWidth = Math.max(newWidth, 50);
      setWidth(updatedWidth); // Minimum width of 50px
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  useEffect(() => {
    const updatedResources = resources.map((res) => {
      if (res.res_name === res_name) {
        return {
          ...res,
          res_data: res.res_data.map((data) => {
            if (data.events[0] === eventName) {
              return {
                ...data,
                width: width,
              };
            }
            return data;
          }),
        };
      }
      return res;
    });
    console.table(updatedResources[1].res_data);
    // setResources(updatedResources);
    localStorage.setItem("allResources", JSON.stringify(updatedResources));
  }, [width]);
  return (
    <div
      ref={resizableRef}
      className={`resizable ${
        selected ? "selected border-2 border-black" : ""
      } cursor-pointer text-white text-sm bg-black m-0.5 rounded-md font-bold`}
      style={{ width: `${width}px`, backgroundColor: randomColor }}
      onClick={() => {
        setSelected(true);
        setTimeout(() => setSelected(false), 1500);
      }}
    >
      <div
        className="resize-handle resize-handle-left"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        onMouseDown={(e: MouseEvent) => handleMouseDown("left", e)}
      />
      <p
        draggable
        onDrag={() => {
          setSelectedEvent({
            event: ev.events[0],
            month: currentMonthIndex,
            date: i,
            res_name: res_name,
            width: ev.width,
          });
        }}
        className="p-1"
      >
        {ev.events[0]}
      </p>
      <div
        className="resize-handle resize-handle-right"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        onMouseDown={(e) => handleMouseDown("right", e)}
      />
    </div>
  );
}
