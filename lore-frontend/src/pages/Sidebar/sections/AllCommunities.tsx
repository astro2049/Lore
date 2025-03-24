import { Link } from "react-router";
import { getPrefixedCommunityName } from "../../../Utils.ts";
import { useContext } from "react";
import { CommunitiesContext } from "../../../constants/contexts.ts";

function AllCommunities() {
    const { allCommunities } = useContext(CommunitiesContext)!;

    return (
        <div>
            <div className="
                        h-[40px] py-0.25 px-1
                        flex items-center
                        text-xs text-neutral-500"
            >
                ALL COMMUNITIES
            </div>
            {allCommunities.map((community) => {
                return (
                    <Link
                        key={community.name}
                        to={getPrefixedCommunityName(community.name)}
                        className="
                        h-[40px] py-0.25 px-1
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

export default AllCommunities;
