import CommentInput from "../../CommentInput.tsx";
import { useContext, useState } from "react";
import { PopupContext } from "../../../constants/contexts.ts";

type CommentActionRowProps = {
    score: number,
    link: string
};

function CommentActionRow({
                              score,
                              link
                          }: CommentActionRowProps
) {
    const [replyIsActive, setReplyIsActive] = useState(false);
    const popupContext = useContext(PopupContext);

    return (
        <div>
            {/* Actions */}
            <div className="flex gap-0.25 items-center text-xs text-blue-light-custom-1">
                {/* TODO: Fix this vote button's width */}
                <div className="h-[32px] pr-0.75 flex gap-0.5 items-center">
                    <button className="rotate-90">&lt;</button>
                    <span>{score}</span>
                    <button className="-rotate-90">&lt;</button>
                </div>
                <button
                    onClick={() => setReplyIsActive(true)}
                    className="h-[32px] px-0.75 hover:bg-gray-custom-3 hover:text-blue-light-custom-2 rounded-2xl"
                >
                    Reply
                </button>
                <button
                    onClick={() => {
                        void navigator.clipboard.writeText(link);
                        popupContext.showPopup("Link copied");
                    }}
                    className="h-[32px] px-0.75 hover:bg-gray-custom-3 hover:text-blue-light-custom-2 rounded-2xl"
                >
                    -&gt; Share
                </button>
            </div>

            {/* Reply Input */}
            {replyIsActive && <CommentInput isActiveOnMount handleCancelSuperior={() => setReplyIsActive(false)}/>}
        </div>
    );
}

export default CommentActionRow;
