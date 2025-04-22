import { useContext } from "react";
import { UserContext } from "../../constants/contexts.ts";
import Communities from "./sections/Communities.tsx";
import AllCommunities from "./sections/AllCommunities.tsx";

function Sidebar() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <div className="
            scrollable
            pt-0.5 pb-1 px-1
            border-r border-r-white/20
            "
             style={{ height: "calc(100vh - var(--header-height))" }}
        >
            {isLoggedIn &&
                <>
                    <Communities/>
                    <hr className="my-0.5 text-white/10"/>
                </>
            }
            <AllCommunities/>
        </div>
    );
}

export default Sidebar;
