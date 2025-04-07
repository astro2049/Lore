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

    function addColorClass(className: string) {
        if (value === vote) {
            if (value === 1) {
                return className + " text-orange-500";
            } else {
                return className + " text-purple-500";
            }
        }
        return className;
    }

    return (
        <button
            onClick={handleClick}
            className={addColorClass("rotate-90 font-semibold")}>
            {(value === 1 ? "<" : ">")}
        </button>
    );
}

export default VoteButton;
