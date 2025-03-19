import { useContext } from "react";
import { AuthContext, OverlayContext } from "../../../constants/contexts.ts";
import { OverlayType } from "../../../constants/types.ts";
import { Link } from "react-router";

function TopBar() {
    const [, setOverlayType] = useContext(OverlayContext)!;
    const { username } = useContext(AuthContext)!;

    return (
        <div className="
            p-0.75
            sticky top-0 left-0 right-0
            flex justify-between items-center
            bg-dark
            border-b-1 border-b-white/20
            "
             style={{ height: "var(--header-height)" }}
        >
            <Link to="" className="pl-1 font-bold text-2xl">lore</Link>
            <div className="flex items-center gap-0.5">
                {username ?
                    <div className="text-sm">{username}</div> :
                    <button
                        onClick={() => setOverlayType(OverlayType.LogIn)}
                        className="py-0.5 px-1 text-sm font-semibold bg-[#c1f70c] hover:opacity-80 rounded-full text-dark"
                    >
                        Log In
                    </button>
                }
            </div>
        </div>
    );
}

export default TopBar;
