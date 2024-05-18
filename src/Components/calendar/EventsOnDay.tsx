
import { EventsType } from "../../Others/Store";
import Event from "./Event";
export default function EventsOnDay({
  i,
  res_name,
  eventsOnDay,
}: {
  i: number;
  res_name: string;
  eventsOnDay: EventsType[];
}) {

  return (
    <div className="w-[110px] h-[80px] border border-l-0 border-black flex flex-wrap flex-col ">
      {eventsOnDay.map((ev, index) => (
       <Event key={index} i={i} ev={ev} res_name={res_name}/>
      ))}
    </div>
  );
}
