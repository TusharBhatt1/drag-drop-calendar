import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NewEventModal from "./Components/modals/NewEventModal.tsx";
import NewResourceModal from "./Components/modals/NewResourceModal.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <NewResourceModal />
    <NewEventModal />
    <App />
  </>
);
