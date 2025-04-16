import { useContext } from "react";
import { UserContext, CommunitiesContext, CommunityContext } from "../constants/contexts.ts";
import { api } from "../Utils.ts";
import useLogInRequiredAction from "./UseLogInRequiredAction.ts";

type JoinButtonProps = {
    className: string
}

function JoinButton({ className }: JoinButtonProps) {
    const { isLoggedIn } = useContext(UserContext);
    const { community, refreshCommunity } = useContext(CommunityContext);
    const { updateCommunities } = useContext(CommunitiesContext);

    function handleClick() {
        if (!community!.isMember) {
            joinCommunity();
        } else {
            leaveCommunity();
        }
    }

    function joinCommunity() {
        api.post(`communities/${community!.name}/join`)
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
        api.post(`communities/${community!.name}/leave`)
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
            onClick={useLogInRequiredAction(handleClick)}
            className={className}
        >
            {isLoggedIn && community!.isMember ? "Joined" : "Join"}
        </button>
    );
}

export default JoinButton;
