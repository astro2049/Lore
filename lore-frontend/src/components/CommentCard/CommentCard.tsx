import CommentActionRow from "./components/CommentActionRow.tsx";
import { useEffect, useState } from "react";
import { Comment } from "../../constants/types.ts";
import { api } from "../../Utils.ts";

type CommentCardProps = {
    id: string,
    isChild?: boolean,
    isLastOne?: boolean
};

function CommentCard({
                         id,
                         isChild = false,
                         isLastOne = false
                     }: CommentCardProps
) {
    const [comment, setComment] = useState<Comment>();

    useEffect(() => {
        api.get(`comments/${id}`)
            .then((res) => {
                console.log(res.data);
                setComment(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    return (<>{comment &&
        <div className="relative grid grid-cols-[32px_auto]">
            {/* Row 0 */}
            <div className="h-2 col-span-2 flex items-baseline">
                <div className="w-2 text-blue-light-custom-3 text-center">
                    {comment.author.username[0]}
                </div>
                {/* Author */}
                <div className="flex gap-0.5 items-center">
                    <span className="text-xs text-white-custom font-[700]">
                        {comment.author.username}
                    </span>
                    <span className="text-xs text-blue-light-custom-1">
                            • {new Date(comment.createdAt).toDateString()}
                    </span>
                </div>
            </div>

            {/* Thread Line */}
            {/* - The Line */}
            {comment.commentIds.length !== 0 &&
                <div className="absolute top-2 left-1 bottom-0 w-[1px] bg-white/20"></div>}
            {/* - Occluder, [last] child comment */}
            {isChild && isLastOne && <div className="absolute -left-2 w-2 h-full bg-dark"></div>}
            {/* - Connection Arc, child comment */}
            {isChild &&
                <div className="absolute -left-1 w-1 h-1 border-b border-l rounded-bl-xl border-white/20 bg-dark"></div>
            }

            {/* Row 1 */}
            <div></div>
            {/* Content */}
            <div className="mb-0.25 text-sm text-blue-light-custom-3 break-all">
                {comment.content}
            </div>

            {/* Row 2 */}
            <div></div>
            {/* Actions */}
            <CommentActionRow score={comment.score} commentId={id} link={comment.link}/>

            {/* Row 3 */}
            <div></div>
            {/* Comments */}
            <div>
                {comment.commentIds.map((id, index) => {
                    return (
                        <CommentCard
                            key={id}
                            id={id}
                            isChild
                            isLastOne={index === comment.commentIds.length - 1}
                        />
                    )
                })}
            </div>
        </div>
    }</>);
}

export default CommentCard;
