import { OverlayType } from "../../../constants/types.ts";
import icon_cross from "../../../assets/icon-cross.svg";
import { Link } from "react-router";
import { getPrefixedCommunityName } from "../../../Utils.ts";
import { useContext, useEffect } from "react";
import { CommunitiesContext, OverlayContext } from "../../../constants/contexts.ts";

function Communities() {
    const { setOverlayType } = useContext(OverlayContext);
    const { communities, updateCommunities } = useContext(CommunitiesContext)!;

    useEffect(() => {
        updateCommunities();
    }, []);

    return (
        <div>
            <div className="
                        py-0.5 px-1
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
            {communities.map((community) => {
                return (
                    <Link
                        key={community.name}
                        to={getPrefixedCommunityName(community.name)}
                        className="
                        py-0.5 px-1
                        flex items-center
                        text-neutral-200 hover:text-white-custom
                        hover:bg-neutral-800 rounded-lg"
                    >
                        {getPrefixedCommunityName(community.name)}
                    </Link>
                );
            })}
        </div>
    );
}

export default Communities;
