import { useEffect, useState } from "react";
import { months } from "../../assets/calendarData";
import useResourcesStore, { EventsType, ResourceType } from "../../Others/Store";
import EventsOnDay from "./EventsOnDay";
import useModals from "../../Others/useModals";

interface ResourceProp {
  resource: ResourceType;
}

export default function Resource({ resource }: ResourceProp) {
  const { resources, setAddTo } = useResourcesStore();
  const { setIsOpen_newEvent } = useModals();
  const [eventsOfTheMonth, setEventsOfTheMonth] = useState<EventsType[]>([]);
  const { currentMonthIndex, selectedEvent, setResources } =
    useResourcesStore();
  const { res_name, res_data } = resource;

  useEffect(() => {
    const eventsArray = res_data.filter(
      (event) => event.month === currentMonthIndex
    );
    setEventsOfTheMonth(eventsArray);
  }, [currentMonthIndex, res_data]);

  const handleDrop = (date: number, month: number, toAddInRes: string) => {
    //remove from the dragged one
    let updatedResources = resources.map((res) => {
      if (res.res_name === selectedEvent.res_name) {
        res.res_data = res.res_data.filter(
          (ev) => ev.events[0] !== selectedEvent.event
        );
      }

      return res;
    });

    //adding to drop one
    updatedResources = updatedResources.map((res) => {
      if (res.res_name === toAddInRes) {
        res.res_data = [
          ...res.res_data,
          {
            events: [selectedEvent.event],
            date: date,
            month: month,
            width:selectedEvent.width
          },
        ];
      }

      return res;
    });
    localStorage.setItem("allResources", JSON.stringify(updatedResources));
    setResources(updatedResources);
  };

  const generateBlocks = () => {
    const daysInMonth = months[currentMonthIndex].days;
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const eventsOnDay = eventsOfTheMonth.filter((ev) => ev.date === i);
      days.push(
        <div
          key={i}
          onDrop={() => handleDrop(i, currentMonthIndex, res_name)}
          onDragOver={(e) => e.preventDefault()}
          className="flex justify-start items-center flex-wrap"
          onDoubleClick={() => {
            setAddTo({
              addTo_date: i,
              addTo_month: currentMonthIndex,
              addTo_res: res_name,
            });
            setIsOpen_newEvent(true);
          }}
        >
          <EventsOnDay i={i} res_name={res_name} eventsOnDay={eventsOnDay} />
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex">
      <p className="w-[128px] h-[80px] bg-white flex flex justify-center items-center border border-black fixed text-center">
        {res_name}
      </p>
      <div className="flex justify-start items-center ml-32">
        {generateBlocks()}
      </div>
    </div>
  );
}
