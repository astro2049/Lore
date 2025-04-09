import { VoteType } from "../../constants/types.ts";
import { api } from "../../Utils.ts";

type VoteButtonProps = {
    value: 1 | -1,
    targetId: string,
    targetType: VoteType,
    vote: 1 | 0 | -1 | undefined,
    changeScore: (x: number) => void,
    changeVote: (x: number) => void
}

function VoteButton({
                        value,
                        targetId,
                        targetType,
                        vote,
                        changeScore,
                        changeVote
                    }: VoteButtonProps) {
    function handleClick() {
        api.post("votes", {
            value: value,
            targetId: targetId,
            targetType: targetType
        })
            .then((res) => {
                console.log(res);
                if (value === vote) {
                    // Toggle vote
                    changeScore(-value);
                    changeVote(-value);
                } else {
                    changeScore(value);
                    changeVote(value);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function colorStyles() {
        let s = "";
        // 1. border color, on hover
        if (value === 1) {
            s += " hover:border-orange-500";
        } else if (value === -1) {
            s += " hover:border-purple-500";
        }
        // 2. arrow color, on vote
        if (value === 1 && value === vote) {
            s += " text-orange-500";
        } else if (value === -1 && value === vote) {
            s += " text-purple-500";
        }
        return s;
    }

    return (
        <button
            onClick={handleClick}
            className={"px-0.25 rotate-90 font-semibold border border-transparent" + colorStyles()}>
            {(value === 1 ? "<" : ">")}
        </button>
    );
}

export default VoteButton;
