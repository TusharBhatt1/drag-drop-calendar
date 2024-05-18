import {useEffect, useState } from "react";
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
  const { currentMonthIndex, setSelectedEvent } =
    useResourcesStore();

    const [randomColor, setRandomColor] = useState('');

    useEffect(() => {
      setRandomColor(getRandomColor());
    }, []); 
    const getRandomColor = () => {
      const color = uniqolor.random().color
      ;
      return color;
    }

  // const handleDelete = (event: string) => {
  //   if (selected) {
  //     document.addEventListener("keydown", (e) => {
  //       if (e.key === "Delete") {
  //         setResources(
  //           resources.map((res) => {
  //             if (res.res_name === res_name) {
  //               res.res_data = res.res_data.filter(
  //                 (d) => d.events[0] !== event
  //               );
  //             }
  //             return res;
  //           })
  //         );
  //       }
  //     });
  //   }

  //   setSelected(!selected);
  // };

  return (
    <div className="w-[110px] h-[80px] border border-l-0 border-black flex flex-wrap flex-col ">
      {eventsOnDay.map((ev, index) => (
        <div
          key={index}
          className="cursor-pointer text-white text-sm bg-black m-0.5 rounded-md font-bold"
          style={{ backgroundColor: randomColor }}
          // onClick={() => handleDelete(ev.events[0])}
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
