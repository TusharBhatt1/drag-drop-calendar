import { useState } from "react";
import Modal from "./Modal";
import Input from "../Input";
import useModals from "../../Others/useModals";
import useResourcesStore from "../../Others/Store";

export default function NewEventModal() {
  const { isOpen_newEvent, setIsOpen_newEvent } = useModals();
  const [newEvent, setNewEvent] = useState("");
  const {addTo,resources,setResources}=useResourcesStore()

  const handleAddEvent=()=>{
     setResources(
        resources.map((res)=>{
          if(  res.res_name===addTo.addTo_res){
            res.res_data=[
                ...res.res_data,
                {
                    events:[newEvent],
                    date:addTo.addTo_date,
                    month:addTo.addTo_month
                }
            ]
          }
          return res
        })
     )
     localStorage.setItem("allResources",JSON.stringify(resources))
     setIsOpen_newEvent(false)
  }
  const body = (
    <div>
      <Input
        label="Enter Event Name"
        onChange={(e) => setNewEvent(e.target.value)}
      />
    </div>
  );
  return (
    <Modal
      title="Add new Event"
      body={body}
      isOpen={isOpen_newEvent}
      onClose={() => setIsOpen_newEvent(false)}
      onSubmit={handleAddEvent}
      actionLabel="Add"
    />
  );
}
