import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AiFillPlusCircle } from "react-icons/ai";
import { months } from "../assets/calendarData";
import useResourcesStore from "../Others/Store";
import { useEffect } from "react";
import useModals from "../Others/useModals";

export default function TopBar() {
  const { currentMonthIndex, setCurrentMonthIndex } = useResourcesStore();
  const { setIsOpen_newRes } = useModals();
  useEffect(() => {
    if (currentMonthIndex === new Date().getMonth()) {
      window.scroll(104 * new Date().getDate(), 0);
   
    } else window.scroll(0, 0);
  }, [currentMonthIndex]);
  const goToPreviousMonth = () => {
    setCurrentMonthIndex(currentMonthIndex > 0 ? currentMonthIndex - 1 : 0);
  };
  const goToToday = () => {
    setCurrentMonthIndex(new Date().getMonth())
    window.scroll(103.5 * new Date().getDate(), 0);
  };
  const goToNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex < 11 ? currentMonthIndex + 1 : 11);
  };
  return (
    <div className="flex fixed w-full justify-between items-center p-3  bg-slate-100">
        <p className="text-xl font-bold px-1">
          {months[currentMonthIndex].name}
        </p>

        <button
          onClick={() => setIsOpen_newRes(true)}
          className="flex justify-center items-center gap-2 text-sm hover:bg-slate-200 p-1 rounded-full"
        >
        New Resource  <AiFillPlusCircle color="black" size={24} /> 
        </button>
      {/* </div> */}
      <div className="flex justify-center items-center gap-3">
        <button
          className="hover:bg-slate-200 rounded-full"
          onClick={goToPreviousMonth}
        >
          <GrFormPrevious size={28} />
        </button>
        <button
          onClick={goToToday}
          className="text-xl px-2"
        >
          Today
        </button>
        <button
          className="hover:bg-slate-200 rounded-full"
          onClick={goToNextMonth}
        >
          <GrFormNext size={28} />
        </button>
      </div>
    </div>
  );
}
