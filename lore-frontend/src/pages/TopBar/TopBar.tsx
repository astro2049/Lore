import { useContext, useState } from "react";
import { UserContext, OverlayContext } from "../../constants/contexts.ts";
import { OverlayType } from "../../constants/types.ts";
import { Link } from "react-router";
import { api, getPrefixedUsername } from "../../Utils.ts";

function TopBar() {
    const { setOverlayType } = useContext(OverlayContext);
    const { isLoggedIn, username, clearLogInData } = useContext(UserContext);
    const [showUserDrawer, setShowUserDrawer] = useState(false);

    function handleLogOut() {
        api.post("auth/logout")
            .then((res) => {
                console.log(res);
                clearLogInData();
                window.location.reload();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div className="z-1 sticky top-0 left-0 right-0 bg-dark border-b-1 border-b-white/20"
             style={{ height: "var(--header-height)" }}
        >
            <div className="p-0.75 flex justify-between items-center">
                <Link to="" className="pl-1 font-bold text-2xl">lore</Link>
                <div className="flex items-center gap-0.5">
                    {isLoggedIn ?
                        <div>
                            <button
                                onClick={() => setShowUserDrawer(!showUserDrawer)}
                                className="py-0.25 px-0.5 text-sm border-2 border-transparent hover:border-white/50"
                            >
                                {username}
                            </button>
                        </div> :
                        <button
                            onClick={() => setOverlayType(OverlayType.LogIn)}
                            className="py-0.5 px-1 text-sm font-semibold bg-[#c1f70c] hover:opacity-80 rounded-full text-dark"
                        >
                            Log In
                        </button>
                    }
                </div>
            </div>
            {showUserDrawer &&
                <div className="absolute right-0.75 w-[200px] bg-[rgb(25,27,30)] rounded-lg">
                    <Link
                        to={`/${getPrefixedUsername(username!)}`}
                        className="w-full flex gap-x-0.5 py-1 pl-2 pr-3 text-left text-sm text-white/75 hover:text-white whitespace-nowrap border-b border-b-neutral-800"
                    >
                        <div className="w-[20px]"></div>
                        <div>
                            <span className="block">
                                View Profile
                            </span>
                            <span className="block text-xs text-blue-light-custom-1">
                                {getPrefixedUsername(username!)}
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={handleLogOut}
                        className="group flex gap-x-0.5 justify-center items-center py-1 pl-2 pr-3 text-sm text-white/75 hover:text-white whitespace-nowrap"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                             className="fill-white opacity-75 group-hover:opacity-100">
                            <g transform="translate(2.5, 10) rotate(-45)">
                                <rect x="-0.5" y="0" width="1" height="5"/>
                                <rect x="0" y="-0.5" width="5" height="1"/>
                            </g>
                            <rect x="5" y="9.5" width="12.5" height="1"/>
                        </svg>
                        Log Out
                    </button>
                </div>
            }
        </div>
    );
}

export default TopBar;
