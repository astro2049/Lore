import CommentInput from "../../CommentInput.tsx";
import { useState } from "react";
import ShareButton from "../../ShareButton.tsx";

type CommentActionRowProps = {
    score: number,
    commentId: string,
    link: string
};

function CommentActionRow({
                              score,
                              commentId,
                              link
                          }: CommentActionRowProps
) {
    const [replyIsActive, setReplyIsActive] = useState(false);

    return (
        <div>
            {/* Actions */}
            <div className="flex gap-0.25 items-center text-xs text-blue-light-custom-1">
                {/* TODO: Fix this vote button's width */}
                <div className="h-[32px] pr-1 flex gap-0.5 items-center">
                    <button className="rotate-90">&lt;</button>
                    <span>{score}</span>
                    <button className="-rotate-90">&lt;</button>
                </div>
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
