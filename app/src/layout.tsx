import { Outlet } from "react-router-dom";
import Header from "./components/header/header";

export default function Popup() {
    return <div className="popup">
        <Header />
        <Outlet />
    </div>
}