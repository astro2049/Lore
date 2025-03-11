import InformationBar from "../../components/InformationBar/InformationBar.tsx";
import PostActionRow from "../../../../components/PostCard/components/ActionRow/PostActionRow.tsx";
import CommentCard from "../../../../components/CommentCard/CommentCard.tsx";
import CommentInput from "../../../../components/CommentInput/CommentInput.tsx";

function Post() {
    return (
        <div className="content-container flex justify-between">
            <div className="w-[732px] pt-1.25 px-1">
                {/* Author */}
                <div className="flex gap-0.25">
                    <span className="text-xs text-blue-light-custom-2 font-[700]">
                        c/Marathon
                    </span>
                    <span className="text-xs text-blue-light-custom-1">
                        • 18 hr. ago
                    </span>
                </div>
                <div className="text-xs text-blue-light-custom-1">
                    Runner
                </div>

                {/* Title */}
                <h1 className="text-[24px] text-white-custom">
                    Marathon | Overview
                </h1>

                {/* Content */}
                <div className="mt-0.5 mb-1.5 text-sm text-blue-light-custom-2">
                    <p>
                        A massive ghost ship hangs in low orbit over a lost colony on Tau Ceti IV. The 30,000 souls who
                        call this place home have disappeared without a trace. Strange signals hint at mysterious
                        artifacts, long-dormant AI, and troves of untold riches. You are a Runner, venturing into the
                        unknown in a fight for fame… and infamy. Who among you will write their names across the stars?
                    </p>
                    <p>
                        https://www.marathonthegame.com/
                    </p>
                </div>

                {/* Post Stats */}
                <PostActionRow score={31} commentCount={12}/>

                {/* Comment */}
                <CommentInput/>

                {/* Comments */}
                <div className="mb-3">
                    <CommentCard author={"BNG07"} createdTimestamp={"17h ago"}
                                 content="Marathon is currently in development for PlayStation 5, Xbox Series X/S, and PC with full cross play and cross save."
                                 score={6} link={"c/Marathon/posts/1/comments/2"}/>
                    <CommentCard author={"BNG07"} createdTimestamp={"17h ago"}
                                 content="Become a Runner in Bungie’s new sci-fi PvP extraction shooter. Compete for survival, riches, and renown in a world of evolving, persistent zones, where any run can lead to greatness."
                                 score={6} link={"c/Marathon/posts/1/comments/1"}/>
                </div>
            </div>

            {/* Community Information */}
            <InformationBar/>
        </div>
    );
}

export default Post;
