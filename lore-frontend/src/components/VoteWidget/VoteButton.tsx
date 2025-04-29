import { VoteType } from "../../constants/types.ts";
import { api } from "../../Utils.ts";
import useLogInRequiredAction from "../UseLogInRequiredAction.ts";
import { Dispatch, SetStateAction } from "react";

type VoteButtonProps = {
    value: 1 | -1,
    targetId: string,
    targetType: VoteType,
    vote: 1 | 0 | -1 | undefined,
    changeScore: (x: number) => void,
    setVote: Dispatch<SetStateAction<1 | 0 | -1 | undefined>>
}

function VoteButton({
                        value,
                        targetId,
                        targetType,
                        vote,
                        changeScore,
                        setVote
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
                    setVote(0);
                } else {
                    changeScore(value);
                    // @ts-expect-error note: at this point, vote is -1 | 0 | 1 and value is -1 | 1, so result is -1 | 0 | 1
                    setVote(vote + value);
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
            onClick={useLogInRequiredAction(handleClick)}
            className={"px-0.25 rotate-90 font-semibold border border-transparent" + colorStyles()}>
            {(value === 1 ? "<" : ">")}
        </button>
    );
}

export default VoteButton;
