import InformationBar from "./InformationBar.tsx";
import PostActionRow from "../../components/cards/PostCard/PostActionRow.tsx";
import CommentCard from "../../components/cards/CommentCard/CommentCard.tsx";
import CommentInput from "../../components/CommentInput.tsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { api, getPrefixedCommunityName, getPrefixedUsername } from "../../Utils.ts";
import { Link, useNavigate, useParams } from "react-router";
import { CommentInputMode, Post } from "../../constants/types.ts";
import icon_arrow_left from "../../assets/icon-arrow-left.svg"
import { CommentInputContext, DeleteButtonContext, UserContext } from "../../constants/contexts.ts";
import useLogInRequiredAction from "../../components/UseLogInRequiredAction.ts";
import icon_cross from "../../assets/icon-cross.svg";

function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(UserContext);
    const logInRequiredAction = useLogInRequiredAction();

    const refreshPost = useCallback(() => {
        setIsLoading(true);
        api.get<Post>(`posts/${postId}?commentIds`)
            .then((res) => {
                console.log(res.data);
                setPost(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [postId]);

    useEffect(() => {
        refreshPost();
    }, [refreshPost]);

    return (
        <>
            {post &&
                <div className="w-full flex gap-x-1.5">
                    <div className="grow pt-1.25 px-1">
                        <div className="flex gap-x-0.5">
                            <div className="flex flex-col justify-center">
                                <Link to={`/${getPrefixedCommunityName(post.community.name)}`}
                                      className="p-[6px] rounded-full bg-[oklch(0.24_0.033_256.848)] hover:bg-gray-800">
                                    <img src={icon_arrow_left} alt="Return to community"/>
                                </Link>
                            </div>
                            <div>
                                {/* Author */}
                                <div className="flex gap-0.25">
                                    <Link to={`/${getPrefixedCommunityName(post.community.name)}`}
                                          className="text-xs text-blue-light-custom-2 font-[700] hover:text-[rgb(200,220,215)]">
                                        {getPrefixedCommunityName(post.community.name)}
                                    </Link>
                                    <span className="text-xs text-blue-light-custom-1">
                                {`• ${new Date(post.createdAt).toDateString()}`}
                                        {/*• 18 hr. ago*/}
                            </span>
                                </div>
                                <Link to={`/${getPrefixedUsername(post.author.username)}`}
                                      className="text-xs text-blue-light-custom-1 hover:text-blue-light-custom-2">
                                    {post.author.username}
                                </Link>
                            </div>
                        </div>
                        {/* Title */}
                        <h1 className="text-[24px] text-white-custom">
                            {post.title}
                        </h1>

                        {/* Content */}
                        <div className="mt-0.5 mb-1.5 text-sm text-blue-light-custom-2 break-all whitespace-pre-line">
                            {post.content}
                        </div>

                        {/* Post Stats */}
                        <PostActionRow
                            id={post.id}
                            author={post.author}
                            score={post.score}
                            commentCount={post.commentCount}
                            link={`/${getPrefixedCommunityName(post.community.name)}/posts/${post.id}`}
                            vote={post.vote}
                            onDelete={() => void navigate(`/${getPrefixedCommunityName(post.community.name)}`)}
                            showDeleteButton
                        />

                        {/* Comment Input */}
                        {isLoggedIn ?
                            <CommentInputContext.Provider value={{
                                onComment: refreshPost
                            }}>

                                <CommentInput
                                    targetIdOrName={post.id}
                                    mode={CommentInputMode.Post}
                                />
                            </CommentInputContext.Provider>
                            :
                            <button onClick={logInRequiredAction}
                                    className="my-1 h-[38px] px-0.75 flex items-center rounded-full bordered-clickable">
                                <img src={icon_cross} alt=""/>
                                <span className="ml-0.25 text-sm text-white-custom">Join the conversation</span>
                            </button>
                        }

                        {/* Comments */}
                        <CommentInputContext.Provider value={{
                            onComment: refreshPost
                        }}>
                            <DeleteButtonContext value={{
                                onDeleteFromContext: refreshPost
                            }}>
                                <div className="mb-3 flex flex-col gap-0.5">
                                    {!isLoading ?
                                        post.commentIds!.length !== 0 ?
                                            post.commentIds!.map((commentId) => {
                                                return (
                                                    <CommentCard
                                                        key={commentId}
                                                        id={commentId}
                                                    />
                                                );
                                            }) :
                                            <div
                                                className="py-1.5 text-lg text-blue-light-custom-2 font-semibold text-center">
                                                No comments yet
                                            </div>
                                        :
                                        <></>
                                    }
                                </div>
                            </DeleteButtonContext>
                        </CommentInputContext.Provider>
                    </div>

                    {/* Community Information */}
                    <InformationBar/>
                </div>
            }
        </>
    )
        ;
}

export default PostPage;
