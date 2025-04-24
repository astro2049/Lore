import { Link } from "react-router";
import { getDisplayUsername, getPrefixedUsername } from "../Utils.ts";

type ProfileLinkProps = {
    username: string | undefined,
    className: string
}

function ProfileLink({
                         username,
                         className
                     }: ProfileLinkProps) {
    return (
        <>{username ?
            <Link to={`/${getPrefixedUsername(username)}`}
                  className={className}>
                {getDisplayUsername(username)}
            </Link>
            :
            <span className={className
                .split(" ")
                .filter(s => !s.startsWith("hover:"))
                .join(" ")}
            >
                [deleted]
            </span>
        }</>
    );

}

export default ProfileLink;
