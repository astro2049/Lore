import CommentActionRow from "./components/ActionRow/CommentActionRow.tsx";

type CommentCardProps = {
    author: string,
    createdTimestamp: string,
    content: string,
    score: number,
    link: string,
};

function CommentCard({
                         author,
                         createdTimestamp,
                         content,
                         score,
                         link,
                     }: CommentCardProps
) {
    return (
        <div className="mt-1 grid grid-cols-[32px_auto]">
            {/* Row 0 */}
            <div className="h-2 flex justify-center items-center text-blue-light-custom-3">{author[0]}</div>
            <div>
                {/* Author */}
                <div className="h-2 flex gap-0.25 items-center">
                <span className="text-xs text-white-custom font-[700]">
                    {author}
                </span>
                    <span className="text-xs text-blue-light-custom-1">
                    • {createdTimestamp}
                </span>
                </div>
            </div>

            {/* Row 1 */}
            <div></div>
            {/* Content */}
            <div className="mb-0.25 text-sm text-blue-light-custom-3">
                {content}
            </div>

            {/* Row 2 */}
            <div></div>
            {/* Actions */}
            <CommentActionRow score={score} link={link}/>
        </div>
    );
}

export default CommentCard;
