import { Link } from "react-router";
import PostActionRow from "./components/PostActionRow.tsx";
import { api, getPrefixedCommunityName } from "../../Utils.ts";
import { useEffect, useState } from "react";
import { Post } from "../../constants/types.ts";

export type PostCardProps = {
    postId: string,
    displayCommunity?: boolean,
};

function PostCard({
                      postId,
                      displayCommunity = false,
                  }: PostCardProps) {
    const [post, setPost] = useState<Post>();
    const [link, setLink] = useState("");

    useEffect(() => {
        api.get<Post>(`posts/${postId}`)
            .then((res) => {
                console.log(res.data);
                setPost(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        if (!post) {
            return;
        }
        setLink(`/${getPrefixedCommunityName(post.community.name)}/posts/${post.id}`);
    }, [post]);

    return (<>{post &&
        <div>
            <hr className="border-white/10"/>
            <Link to={link}
                  className="block my-0.25 py-0.5 px-1 hover:bg-gray-custom-1 rounded-2xl">
                {/* I. Author/Community Information */}
                <div className="flex gap-0.25 text-xs">
                    <div className="text-blue-light-custom-2 font-semibold">
                        {displayCommunity ? getPrefixedCommunityName(post.community.name) : post.author.username}
                    </div>
                    <span className="text-blue-light-custom-1">•</span>
                    <div className="text-blue-light-custom-1">{new Date(post.createdAt).toDateString()}</div>
                </div>

                {/* II. Title */}
                <div className="py-0.5 text-[18px] text-white-custom font-semibold">{post.title}</div>

                {/* III.1. Content */}
                {post.content &&
                    <div className="max-h-[120px] overflow-y-hidden pb-0.5 text-sm text-blue-light-custom-3 break-all">
                        {post.content}
                    </div>
                }

                {/* III.2. Cover Image */}
                {post.coverUrl && <img src={post.coverUrl} className="rounded-[8px]"/>}

                {/* IV. Post Stats */}
                <PostActionRow score={post.score} commentCount={post.commentCount}
                               link={link}/>
            </Link>
        </div>
    }</>);
}

export default PostCard;
