import TopBar from "./pages/TopBar/TopBar.tsx";
import Sidebar from "./pages/Sidebar/Sidebar.tsx";
import { Outlet } from "react-router";
import OverlayController from "./overlays/OverlayController.tsx";
import PopupController from "./components/providers/PopupController.tsx";
import UserProvider from "./components/providers/UserProvider.tsx";
import CommunitiesController from "./components/providers/CommunitiesController.tsx";

function Lore() {
    return (
        <UserProvider>
            <PopupController>
                <CommunitiesController>
                    <OverlayController>
                        <TopBar/>
                        <div className="w-full grid grid-cols-[250px_auto]">
                            <Sidebar/>
                            <div className="flex px-1.5 justify-center">
                                <Outlet/>
                            </div>
                        </div>
                    </OverlayController>
                </CommunitiesController>
            </PopupController>
        </UserProvider>
    );
}

export default Lore;
