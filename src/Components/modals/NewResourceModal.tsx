import { useState } from "react";
import Modal from "./Modal";
import Input from "../Input";
import useModals from "../../Others/useModals";
import useResourcesStore from "../../Others/Store";

export default function NewResourceModal() {
  const { isOpen_newRes, setIsOpen_newRes } = useModals();
  const [newRes, setNewRes] = useState("");
  const { resources, setResources } = useResourcesStore();

  const handleAddRes = () => {
    setResources([
      ...resources,
      {
        res_name: newRes,
        res_data: [],
      },
    ]);

    localStorage.setItem("allResources", JSON.stringify(resources));
    setIsOpen_newRes(false);
  };
  const body = (
    <div>
      <Input
        label="Enter Resource Name"
        onChange={(e) => setNewRes(e.target.value)}
      />
    </div>
  );
  return (
    <Modal
      title="Add new Event"
      body={body}
      isOpen={isOpen_newRes}
      onClose={() => setIsOpen_newRes(false)}
      onSubmit={handleAddRes}
      actionLabel="Add"
    />
  );
}
