import ShareButton from "../../ShareButton.tsx";
import { VoteType } from "../../../constants/types.ts";
import VoteWidget from "../../VoteWidget/VoteWidget.tsx";
import { useContext } from "react";
import { UserContext } from "../../../constants/contexts.ts";
import DeleteButton from "../../DeleteButton.tsx";

type PostActionRowProps = {
    id: string,
    author: {
        username: string
    }
    score: number,
    commentCount: number,
    link: string,
    vote: 1 | 0 | -1 | undefined,
    onDelete?: () => void,
    showDeleteButton?: boolean
};

function PostActionRow({
                           id,
                           author,
                           score,
                           commentCount,
                           link,
                           vote,
                           onDelete,
                           showDeleteButton = false
                       }: PostActionRowProps) {
    const { isLoggedIn, username } = useContext(UserContext);

    return (
        <div className="mt-0.5 flex gap-0.75 items-center text-xs">
            <VoteWidget score={score}
                        targetId={id}
                        targetType={VoteType.Post}
                        vote={vote}
                        className="h-[32px] px-0.5 flex items-center bg-gray-custom-2 rounded-full"/>
            <div
                className="h-[32px] px-0.75 flex items-center bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full">{commentCount} Comments
            </div>
            <ShareButton link={link} className="h-[32px] px-0.75 bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full"/>
            {
                isLoggedIn && username === author.username && showDeleteButton &&
                <DeleteButton
                    link={`posts/${id}`}
                    onDelete={onDelete}
                    className="h-[32px] px-0.75 hover:text-red-500 hover:underline"
                />
            }
        </div>
    );
}

export default PostActionRow;
