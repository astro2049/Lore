import InformationBar from "../components/InformationBar.tsx";
import PostActionRow from "../../../components/PostCard/components/PostActionRow.tsx";
import CommentCard from "../../../components/CommentCard/CommentCard.tsx";
import CommentInput from "../../../components/CommentInput.tsx";
import { useEffect, useState } from "react";
import { api, getPrefixedCommunityName } from "../../../Utils.ts";
import { useParams } from "react-router";
import { Post } from "../../../constants/types.ts";

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        api.get(`posts/${postId}`)
            .then((res) => {
                console.log(res.data);
                setPost(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <>
            {post &&
                <div className="w-full flex justify-between">
                    <div className="w-[732px] pt-1.25 px-1">
                        {/* Author */}
                        <div className="flex gap-0.25">
                            <span className="text-xs text-blue-light-custom-2 font-[700]">
                                {getPrefixedCommunityName(post.community.name)}
                            </span>
                            <span className="text-xs text-blue-light-custom-1">
                                {`• ${new Date(post.createdAt).toDateString()}`}
                                {/*• 18 hr. ago*/}
                            </span>
                        </div>
                        <div className="text-xs text-blue-light-custom-1">
                            {post.author.username}
                        </div>

                        {/* Title */}
                        <h1 className="text-[24px] text-white-custom">
                            {post.title}
                        </h1>

                        {/* Content */}
                        <div className="mt-0.5 mb-1.5 text-sm text-blue-light-custom-2">
                            {post.content}
                        </div>

                        {/* Post Stats */}
                        <PostActionRow
                            score={31}
                            commentCount={12}
                            link={`${getPrefixedCommunityName(post.community.name)}/posts/${post.id}`}
                        />

                        {/* Comment */}
                        <CommentInput
                            postId={post.id}
                        />

                        {/* Comments */}
                        <div className="mb-3 flex flex-col gap-0.5">
                            {post.commentIds.map((commentId) => {
                                return (
                                    <CommentCard
                                        key={commentId}
                                        id={commentId}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Community Information */}
                    <InformationBar/>
                </div>}
        </>
    );
}

export default PostPage;
