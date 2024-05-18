import useResourcesStore from "../../Others/Store";
import { months, weekdays } from "../../assets/calendarData";

export default function Days() {
  const { currentMonthIndex } = useResourcesStore();
  const currentMonth = months[currentMonthIndex];
  const generateCalendarDays = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const startDay = new Date(
      currentDate.getFullYear(),
      currentMonthIndex,
      1
    ).getDay();
    const days = [];
    for (let i = 0; i <= currentMonth.days; i++) {
      const dayOfWeekIndex = (startDay + i - 1) % 7;
      const dayOfWeek = weekdays[dayOfWeekIndex];
      const isCurrentDay =
        i === currentDay && currentMonthIndex === currentDate.getMonth();
      days.push(
        i === 0 ? (
         ""
        ) : (
          <div key={i} className="flex justify-center items-center ">
            <p className={`${isCurrentDay && "bg-black text-white"} text-sm p-1 border border-l-0 border-black w-[110px] text-center`}>
              {i} {dayOfWeek}
            </p>
          </div>
        )
      );
    }
    return days;
  };
  
  return <div className="">
     <div >
            <p className="w-[128px] border border-black p-1 bg-white text-white fixed">All Resources</p>
    </div>
    <div className="flex ml-32">
    {generateCalendarDays()}
    </div>
    </div>;
}
