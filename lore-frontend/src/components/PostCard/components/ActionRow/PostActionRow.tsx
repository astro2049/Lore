type PostActionRowProps = {
    score: number,
    commentCount: number
};

function PostActionRow({
                           score,
                           commentCount
                       }: PostActionRowProps) {
    return (
        <div className="mt-0.5 flex gap-0.75 items-center text-xs">
            <div className="h-[32px] px-0.75 flex gap-0.25 items-center bg-gray-custom-2 rounded-full">
                <button className="rotate-90">&lt;</button>
                <span>{score}</span>
                <button className="-rotate-90">&lt;</button>
            </div>
            <div className="h-[32px] px-0.75 flex items-center bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full">{commentCount} Comments</div>
            <button className="h-[32px] px-0.75 bg-gray-custom-2 hover:bg-gray-custom-3 rounded-full">
                -&gt; Share
            </button>
        </div>
    );
}

export default PostActionRow;
