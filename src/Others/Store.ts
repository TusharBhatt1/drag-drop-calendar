import { create } from "zustand";

export interface EventsType {
  events: string[];
  date: number;
  month: number;
  width:number
}
export interface DragType {
  event: string;
  date: number;
  month: number;
  res_name: string;
  width:number
}

export interface ResourceType {
  res_name: string;
  res_data: EventsType[];
}
interface AddToType {
  addTo_res: string;
  addTo_date: number;
  addTo_month: number;
}

interface useResourcesProps {
  addTo: AddToType;
  setAddTo: (val: AddToType) => void;
  selectedEvent: DragType;
  setSelectedEvent: (obj: DragType) => void;
  currentMonthIndex: number;
  setCurrentMonthIndex: (val: number) => void;
  resources: ResourceType[];
  setResources: (data: ResourceType[]) => void;
  addNewResource: (resource: ResourceType) => void; 
}

const useResourcesStore = create<useResourcesProps>((set) => ({
  addTo: { addTo_date: 0, addTo_month: 0, addTo_res: "" },
  setAddTo: (obj) => set({ addTo: obj }),
  selectedEvent: {
    event: "",
    date: 0,
    month: 0,
    res_name: "",
   width:100

  },

  setSelectedEvent: (obj) => set({ selectedEvent: obj }),
  currentMonthIndex: new Date().getMonth(),
  setCurrentMonthIndex: (val) => set({ currentMonthIndex: val }),
  resources: [
    {
      res_name: "res 1",
      res_data: [
        {
          events: ["Read"],
          month: 4,
          date: 21,
          width:100
        },
        {
          events: ["Write"],
          month: 4,
          date: 19,
          width:100
        },
        {
          events: ["Dance"],
          month: 4,
          date: 25,
          width:100

        },
      ],
    },
    {
      res_name: "res 2",
      res_data: [
        {
          events: ["Swim"],
          month: 4,
          date: 22,
          width:100

        },
      ],
    },
  ],
  setResources: (data) => set({ resources: data }),
  addNewResource: (resource) => {
    set((state) => ({ resources: [...state.resources, resource] }));
  },
}));

export default useResourcesStore;
