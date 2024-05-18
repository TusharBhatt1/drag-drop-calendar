import { useEffect, useState } from "react";
import useResourcesStore, { EventsType } from "../Others/Store";
import uniqolor from "uniqolor";
export default function EventsOnDay({
  i,
  res_name,
  eventsOnDay,
}: {
  i: number;
  res_name: string;
  eventsOnDay: EventsType[];
}) {
  const { currentMonthIndex, setSelectedEvent, setResources, resources } =
    useResourcesStore();
  const [randomColor, setRandomColor] = useState("");
  const [selected, setSelected] = useState(false);
  const [event, setEvent] = useState("");
  useEffect(() => {
    setRandomColor(getRandomColor());
  }, []);
  const getRandomColor = () => {
    const color = uniqolor.random().color;
    return color;
  };

  useEffect(() => {
    handleDelete(event);
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

        setResources(updatedResources);
        localStorage.setItem("allResources", JSON.stringify(updatedResources));
      }
    });
  };

  return (
    <div className="w-[110px] h-[80px] border border-l-0 border-black flex flex-wrap flex-col ">
      {eventsOnDay.map((ev, index) => (
        <div
          key={index}
          className={`${
            selected && "border-2 border-black"
          } cursor-pointer text-white text-sm bg-black m-0.5 rounded-md font-bold`}
          style={{ backgroundColor: randomColor }}
          onClick={() => {
            setSelected(true);
            setEvent(ev.events[0]);
            setTimeout(() => setSelected(false), 1500);
          }}
        >
          <p
            key={index}
            draggable
            onDrag={() => {
              setSelectedEvent({
                event: ev.events[0],
                month: currentMonthIndex,
                date: i,
                res_name: res_name,
              });
            }}
            className="p-1"
          >
            {ev.events[0]}
          </p>
        </div>
      ))}
    </div>
  );
}
