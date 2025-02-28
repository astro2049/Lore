import TopBar from "./components/topBar/TopBar.tsx";
import SideBar from "./components/sideBar/SideBar.tsx";
import { Outlet } from "react-router";

function Lore() {
    return (
        <>
            <TopBar/>
            <div className="flex">
                <SideBar/>
                <Outlet/>
            </div>
        </>
    )
}

export default Lore
