import { Link } from "react-router";
import { getCommunityFullName } from "../../../Utils.ts";
import icon_cross from "../../../assets/icon-cross.svg";
import { useContext } from "react";
import { OverlayContext } from "../../../constants/contexts.ts";
import { OverlayType } from "../../../constants/types.ts";

const communities: string[] = [
    "Fortnite",
    "Marathon",
    "Apex Legends",
    "Starfield"
];

function Sidebar() {
    const [, setOverlayType] = useContext(OverlayContext)!;

    return (
        <div className="
            scrollable
            sticky
            pt-0.5 px-1
            border-r border-r-white/20
            "
             style={{ height: "calc(100vh - var(--header-height))" }}
        >
            <div className="
                        h-[40px] py-0.25 px-1
                        flex items-center
                        text-xs text-neutral-500"
            >
                COMMUNITIES
            </div>
            <button
                onClick={() => setOverlayType(OverlayType.CreateCommunity)}
                className="
                        w-full h-[40px] py-0.25 px-1
                        flex items-center
                        text-neutral-200 hover:text-white-custom
                        hover:bg-neutral-800 rounded-lg"
            >
                <img src={icon_cross} alt=""/>
                <span className="ml-0.5">Create a community</span>
            </button>
            {communities.map((community: string) => {
                return (
                    <Link
                        key={community}
                        to={getCommunityFullName(community)}
                        className="
                        h-[40px] py-0.25 px-1
                        flex items-center
                        text-neutral-200 hover:text-white-custom
                        hover:bg-neutral-800 rounded-lg"
                    >
                        {getCommunityFullName(community)}
                    </Link>
                );
            })}
        </div>
    );
}

export default Sidebar;
