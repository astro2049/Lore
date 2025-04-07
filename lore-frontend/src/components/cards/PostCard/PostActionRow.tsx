import ShareButton from "../../ShareButton.tsx";
import { VoteType } from "../../../constants/types.ts";
import VoteWidget from "../../VoteWidget/VoteWidget.tsx";

type PostActionRowProps = {
    id: string,
    score: number,
    commentCount: number,
    link: string,
    vote: 1 | 0 | -1 | undefined
};

function PostActionRow({
                           id,
                           score,
                           commentCount,
                           link,
                           vote
                       }: PostActionRowProps) {
    return (
        <div className="mt-0.5 flex gap-0.75 items-center text-xs">
            <VoteWidget score={score}
                        targetId={id}
                        targetType={VoteType.Post}
                        vote={vote}
                        className="h-[32px] px-0.75 flex gap-0.25 items-center bg-gray-custom-2 rounded-full"/>
            <div
                className="h-[32px] px-0.75 flex items-center bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full">{commentCount} Comments
            </div>
            <ShareButton link={link} className="h-[32px] px-0.75 bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full"/>
        </div>
    );
}

export default PostActionRow;
