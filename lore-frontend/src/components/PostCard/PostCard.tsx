import { Link } from "react-router";
import PostActionRow from "./components/PostActionRow.tsx";
import { getPrefixedCommunityName } from "../../Utils.ts";

export type PostCardProps = {
    id: string,
    displayCommunity?: boolean,
    community?: {
        name: string
    }
    author: {
        username: string
    },
    createdAt: string,
    content: string,
    title: string,
    coverUrl?: string,
    score: number,
    commentCount: number,
    link: string
};

function PostCard({
                      id,
                      title,
                      link,
                      displayCommunity = false,
                      community,
                      author,
                      createdAt,
                      content,
                      coverUrl,
                      score,
                      commentCount
                  }: PostCardProps) {
    return (
        <div>
            <hr className="border-white/10"/>
            <Link to={link} className="block my-0.25 py-0.5 px-1 hover:bg-gray-custom-1 rounded-2xl">
                {/* I. Author/Community Information */}
                <div className="flex gap-0.25 text-xs">
                    <div className="text-blue-light-custom-2 font-semibold">
                        {displayCommunity ? getPrefixedCommunityName(community.name) : author.username}
                    </div>
                    <span className="text-blue-light-custom-1">•</span>
                    <div className="text-blue-light-custom-1">{new Date(createdAt).toDateString()}</div>
                </div>

                {/* II. Title */}
                <div className="py-0.5 text-[18px] text-white-custom font-semibold">{title}</div>

                {/* III.1. Content */}
                {content &&
                    <div className="max-h-[120px] overflow-y-hidden pb-0.5 text-sm text-blue-light-custom-3 break-all">
                        {content}
                    </div>
                }

                {/* III.2. Cover Image */}
                {coverUrl && <img src={coverUrl} className="rounded-[8px]"/>}

                {/* IV. Post Stats */}
                <PostActionRow score={120} commentCount={commentCount} link={`posts/${id}`}/>
            </Link>
        </div>
    );
}

export default PostCard;
