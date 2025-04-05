import ShareButton from "../../ShareButton.tsx";

type PostActionRowProps = {
    score: number,
    commentCount: number,
    link: string
};

function PostActionRow({
                           score,
                           commentCount,
                           link
                       }: PostActionRowProps) {
    return (
        <div className="mt-0.5 flex gap-0.75 items-center text-xs">
            <div className="h-[32px] px-0.75 flex gap-0.25 items-center bg-gray-custom-2 rounded-full">
                <button className="rotate-90">&lt;</button>
                <span className="w-1 text-center">{score}</span>
                <button className="-rotate-90">&lt;</button>
            </div>
            <div
                className="h-[32px] px-0.75 flex items-center bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full">{commentCount} Comments
            </div>
            <ShareButton link={link} className="h-[32px] px-0.75 bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full"/>
        </div>
    );
}

export default PostActionRow;
