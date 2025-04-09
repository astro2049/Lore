import CommentInput from "../../CommentInput.tsx";
import { useState } from "react";
import ShareButton from "../../ShareButton.tsx";
import { VoteType } from "../../../constants/types.ts";
import VoteWidget from "../../VoteWidget/VoteWidget.tsx";

type CommentActionRowProps = {
    score: number,
    commentId: string,
    link: string,
    vote: 1 | 0 | -1 | undefined
};

function CommentActionRow({
                              score,
                              commentId,
                              link,
                              vote
                          }: CommentActionRowProps
) {
    const [replyIsActive, setReplyIsActive] = useState(false);

    return (
        <div>
            {/* Actions */}
            <div className="flex gap-0.25 items-center text-xs text-blue-light-custom-1">
                <VoteWidget score={score}
                            targetId={commentId}
                            targetType={VoteType.Comment}
                            vote={vote}
                            className="h-[32px] pr-0.5 flex items-center"/>
                <button
                    onClick={() => setReplyIsActive(true)}
                    className="h-[32px] px-1 hover:bg-gray-custom-3 hover:text-blue-light-custom-2 rounded-2xl"
                >
                    Reply
                </button>
                <ShareButton link={link}
                             className="h-[32px] px-1 hover:bg-gray-custom-3 hover:text-blue-light-custom-2 rounded-2xl"/>
            </div>

            {/* Reply Input */}
            {replyIsActive &&
                <CommentInput
                    isActiveOnMount
                    handleCancelSuperior={() => setReplyIsActive(false)}
                    parentId={commentId}
                />
            }
        </div>
    );
}

export default CommentActionRow;
