import CommentInput from "../../CommentInput.tsx";
import { useContext, useState } from "react";
// import ShareButton from "../../ShareButton.tsx";
import { CommentInputMode, User, VoteType } from "../../../constants/types.ts";
import VoteWidget from "../../VoteWidget/VoteWidget.tsx";
import { UserContext } from "../../../constants/contexts.ts";
import DeleteButton from "../../DeleteButton.tsx";
import useLogInRequiredAction from "../../UseLogInRequiredAction.ts";

type CommentActionRowProps = {
    score: number,
    commentId: string,
    link: string,
    vote: 1 | 0 | -1 | undefined,
    author: User | null
};

function CommentActionRow({
                              score,
                              commentId,
                              // link,
                              vote,
                              author
                          }: CommentActionRowProps
) {
    const [replyIsActive, setReplyIsActive] = useState(false);
    const { isLoggedIn, username } = useContext(UserContext);

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
                    onClick={useLogInRequiredAction(() => setReplyIsActive(true))}
                    className="h-[32px] px-1 hover:bg-gray-custom-3 hover:text-blue-light-custom-2 rounded-2xl"
                >
                    Reply
                </button>
                {/*<ShareButton*/}
                {/*    link={link}*/}
                {/*    className="h-[32px] px-1 hover:bg-gray-custom-3 hover:text-blue-light-custom-2 rounded-2xl"*/}
                {/*/>*/}
                {
                    isLoggedIn && username === author?.username &&
                    <DeleteButton
                        link={`comments/${commentId}`}
                        className="h-[32px] px-1 hover:text-red-500 hover:underline"
                    />
                }
            </div>

            {/* Reply Input */}
            {replyIsActive &&
                <CommentInput
                    isActiveOnMount
                    handleCancelSuperior={() => setReplyIsActive(false)}
                    targetIdOrName={commentId}
                    mode={CommentInputMode.Comment}
                />
            }
        </div>
    );
}

export default CommentActionRow;
