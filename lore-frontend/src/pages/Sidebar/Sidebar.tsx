import { useContext } from "react";
import { AuthContext } from "../../constants/contexts.ts";
import Communities from "./sections/Communities.tsx";
import AllCommunities from "./sections/AllCommunities.tsx";

function Sidebar() {
    const { username } = useContext(AuthContext)!;

    return (
        <div className="
            scrollable
            sticky
            pt-0.5 px-1
            border-r border-r-white/20
            "
             style={{ height: "calc(100vh - var(--header-height))" }}
        >
            {username && <Communities/>}
            <AllCommunities/>
        </div>
    );
}

export default Sidebar;
