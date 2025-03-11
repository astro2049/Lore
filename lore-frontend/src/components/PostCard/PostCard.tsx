import { Link } from "react-router";
import PostActionRow from "./components/ActionRow/PostActionRow.tsx";

export type PostCardProps = {
    link: string,
    author: string,
    createdTimestamp: string,
    postTitle: string,
    coverUrl?: string,
    score: number,
    commentCount: number
};

function PostCard({
                      link,
                      author,
                      createdTimestamp,
                      postTitle,
                      coverUrl,
                      score,
                      commentCount
                  }: PostCardProps) {
    return (
        <div>
            <hr className="border-white/10"/>
            <Link to={link} className="block my-0.25 py-0.5 px-1 hover:bg-gray-custom-1 rounded-2xl">
                {/* I. Author Information */}
                <div className="flex gap-0.25 text-xs">
                    <div className="text-blue-light-custom-2">{author}</div>
                    <span className="text-blue-light-custom-1">•</span>
                    <div className="text-blue-light-custom-1">{createdTimestamp}</div>
                </div>

                {/* II. Title */}
                <div className="text-[18px] text-white-custom font-semibold">{postTitle}</div>

                {/* III. Content */}
                {coverUrl && <img src={coverUrl} className="rounded-[8px]"/>}

                {/* IV. Post Stats */}
                <PostActionRow score={score} commentCount={commentCount}/>
            </Link>
        </div>
    );
}

export default PostCard;
