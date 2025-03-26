import TopBar from "./pages/TopBar/TopBar.tsx";
import Sidebar from "./pages/Sidebar/Sidebar.tsx";
import { Outlet } from "react-router";
import OverlayController from "./overlays/OverlayController.tsx";
import PopupController from "./components/PopupController.tsx";
import UserProvider from "./components/UserProvider.tsx";
import CommunitiesController from "./pages/components/CommunitiesController.tsx";

function Lore() {
    return (
        <UserProvider>
            <PopupController>
                <CommunitiesController>
                    <OverlayController>
                        <div className="mx-auto w-fit">
                            <TopBar/>
                            <div className="grid grid-cols-[250px_auto]">
                                <Sidebar/>
                                <div className="flex w-[1120px] px-1.5 justify-center bg-dark">
                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </OverlayController>
                </CommunitiesController>
            </PopupController>
        </UserProvider>
    );
}

export default Lore;
