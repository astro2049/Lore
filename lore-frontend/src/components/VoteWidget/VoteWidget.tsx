import VoteButton from "./VoteButton.tsx";
import { VoteType } from "../../constants/types.ts";
import { useEffect, useState } from "react";

type VoteWidgetProps = {
    score: number,
    targetId: string,
    targetType: VoteType,
    vote: 1 | 0 | -1 | undefined,
    className: string
}

function VoteWidget({
                        score,
                        targetId,
                        targetType,
                        vote,
                        className
                    }: VoteWidgetProps) {
    const [score_, setScore_] = useState<number>();
    const [vote_, setVote_] = useState<1 | 0 | -1 | undefined>();

    useEffect(() => {
        setScore_(score);
    }, [score]);

    useEffect(() => {
        setVote_(vote);
    }, [vote]);

    function changeScore(x: number) {
        setScore_(score_ + x);
    }

    function changeVote(x: number) {
        setVote_(vote_ + x);
    }

    return (
        <div className={className}>
            <VoteButton
                value={1}
                targetId={targetId}
                targetType={targetType}
                changeScore={changeScore}
                vote={vote_}
                changeVote={changeVote}
            />
            <span className="w-1 text-center">{score_}</span>
            <VoteButton
                value={-1}
                targetId={targetId}
                targetType={targetType}
                changeScore={changeScore}
                vote={vote_}
                changeVote={changeVote}
            />
        </div>
    );
}

export default VoteWidget;
