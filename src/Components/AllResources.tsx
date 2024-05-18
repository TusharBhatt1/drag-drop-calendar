
import { useEffect } from "react";
import useResourcesStore from "../Others/Store";
import Resource from "./Resource";

export default function AllResources() {
  const { resources ,setResources} = useResourcesStore();
  useEffect(() => {
    const fromLocalStorage = localStorage.getItem("allResources");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    setResources(JSON.parse(fromLocalStorage) || resources);

  }, []);
  
  return (
    <div className="flex flex-col">
      {resources.map((res,index) => (
        <div key={index}>
        <Resource resource={res}  />
        </div>
      ))}
    </div>
  );
}
