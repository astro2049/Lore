import TopBar from "./pages/TopBar/TopBar.tsx";
import Sidebar from "./pages/Sidebar/Sidebar.tsx";
import { Outlet } from "react-router";
import OverlayController from "./overlays/OverlayController.tsx";
import PopupController from "./components/PopupController.tsx";
import AuthController from "./components/AuthController.tsx";
import CommunitiesController from "./pages/components/CommunitiesController.tsx";

function Lore() {
    return (
        <AuthController>
            <PopupController>
                <CommunitiesController>
                    <OverlayController>
                        <div className="mx-auto w-fit">
                            <TopBar/>
                            <div className="grid grid-cols-[250px_auto]">
                                <Sidebar/>
                                <div className="flex w-full justify-center bg-dark">
                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </OverlayController>
                </CommunitiesController>
            </PopupController>
        </AuthController>
    );
}

export default Lore;
