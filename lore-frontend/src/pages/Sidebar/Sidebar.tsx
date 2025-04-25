import { useContext } from "react";
import { UserContext } from "../../constants/contexts.ts";
import Communities from "./sections/Communities.tsx";
import AllCommunities from "./sections/AllCommunities.tsx";
import { Link } from "react-router";

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
            <hr className="my-0.5 text-white/10"/>
            <div>
                <div className="py-0.5 px-1 text-xs text-neutral-500">
                    ABOUT
                </div>
                <Link
                    to={"/privacy-notice"}
                    className="block py-0.25 pl-1 text-neutral-400 hover:text-white-custom hover:underline"
                >
                    Privacy Notice
                </Link>
                <a href="https://github.com/astro2049"
                   className="block py-0.25 px-1 text-neutral-400 hover:text-white-custom hover:underline">
                    astro @2025
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
