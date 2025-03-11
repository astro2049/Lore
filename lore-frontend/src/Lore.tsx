import TopBar from "./pages/components/TopBar/TopBar.tsx";
import Sidebar from "./pages/components/Sidebar/Sidebar.tsx";
import { Outlet } from "react-router";
import OverlayController from "./overlays/OverlayController.tsx";
import PopupController from "./components/PopupController/PopupController.tsx";

function Lore() {
    return (
        <OverlayController>
            <PopupController>
                <div className="mx-auto w-fit">
                    <TopBar/>
                    <div className="grid grid-cols-[250px_auto]">
                        <Sidebar/>
                        <div className="flex w-full justify-center bg-dark">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </PopupController>
        </OverlayController>
    );
}

export default Lore;
