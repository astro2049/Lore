import { useContext } from "react";
import { UserContext, CommunitiesContext, CommunityContext, OverlayContext } from "../../../constants/contexts.ts";
import { OverlayType } from "../../../constants/types.ts";
import { api } from "../../../Utils.ts";

type JoinButtonProps = {
    className: string
}

function JoinButton({ className }: JoinButtonProps) {
    const { username } = useContext(UserContext)!;
    const [, setOverlayType] = useContext(OverlayContext)!;
    const { community, refreshCommunity } = useContext(CommunityContext)!;
    const { updateCommunities } = useContext(CommunitiesContext)!;

    function handleClick() {
        if (!username) {
            setOverlayType(OverlayType.SignUp);
            return;
        }
        if (!community.isMember) {
            joinCommunity();
        } else {
            leaveCommunity();
        }
    }

    function joinCommunity() {
        api.post(`communities/${community.name}/join`)
            .then((res) => {
                console.log(res);
                refreshCommunity();
                updateCommunities();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function leaveCommunity() {
        api.post(`communities/${community.name}/leave`)
            .then((res) => {
                console.log(res);
                refreshCommunity();
                updateCommunities();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <button
            onClick={handleClick}
            className={className}
        >
            {username && community.isMember ? "Joined" : "Join"}
        </button>
    );
}

export default JoinButton;
