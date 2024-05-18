import AllResources from "./Components/AllResources";
import Days from "./Components/Days";
import TopBar from "./Components/TopBar";

export default function App() {
  return (
    <div className="flex flex-col gap-12">
      <TopBar />
      <div className="mt-14 flex flex-col">
        <Days />
        <AllResources />
      </div>
    </div>
  );
}
