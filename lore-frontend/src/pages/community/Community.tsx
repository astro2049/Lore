import { Link, useNavigate } from "react-router";
import { api, getPrefixedCommunityName } from "../../Utils.ts";
import PostCard from "../../components/cards/PostCard/PostCard.tsx";
import icon_cross from "../../assets/icon-cross.svg"
import InformationBar from "./InformationBar.tsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { CommunitiesContext, CommunityContext, UserContext } from "../../constants/contexts.ts";
import JoinButton from "../../components/JoinButton.tsx";
import DeleteButton from "../../components/DeleteButton.tsx";
import useLogInRequiredAction from "../../components/UseLogInRequiredAction.ts";

function Community() {
    const { community } = useContext(CommunityContext)!;
    const [postIds, setPostIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn, username } = useContext(UserContext);
    const { updateCommunities, updateAllCommunities } = useContext(CommunitiesContext)!;
    const navigate = useNavigate();

    const refreshPosts = useCallback(() => {
        setIsLoading(true);
        api.get<string[]>(`communities/${community.name}/posts`)
            .then((res) => {
                console.log(res.data);
                setPostIds(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [community]);

    useEffect(() => {
        refreshPosts();
    }, [refreshPosts]);

    return (
        <div className="w-full">
            {/* Community Banner */}
            {/*<div className="mt-0.5 h-[128px] bg-amber-300 rounded-lg">*/}
            {/*    <div className="pt-0.5 pr-1 flex justify-end">*/}
            {/*        <button*/}
            {/*            className="*/}
            {/*            text-black/50 hover:text-black/80 text-sm*/}
            {/*            hover:underline*/}
            {/*            ">*/}
            {/*            Edit*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/* Title Bar */}
            <div className="mt-1 px-1 flex justify-between gap-x-1 items-start">
                {/* left: Avatar, Name */}
                <div className="flex items-start">
                    {/*<div className="w-[88px] h-[88px]"></div>*/}
                    <h1 className="min-w-0 text-3xl font-bold break-all">
                        {getPrefixedCommunityName(community.name)}
                    </h1>
                </div>
                {/* right: Create Post, Join, Delete buttons */}
                <div className="shrink-0 flex items-end text-sm font-semibold">
                    <Link to="./submit"
                          onClick={useLogInRequiredAction()}
                          className="h-[38px] px-0.75 flex items-center rounded-full bordered-clickable">
                        <img src={icon_cross} alt=""/>
                        <span className="ml-0.25">Create Post</span>
                    </Link>
                    <JoinButton
                        className="ml-1 h-[38px] px-0.75 rounded-full bordered-clickable"
                    />
                    {
                        isLoggedIn && username === community.creator.username &&
                        <DeleteButton
                            link={`communities/${community.name}`}
                            onDelete={() => {
                                updateCommunities();
                                updateAllCommunities();
                                void navigate("/");
                            }}
                            className="ml-1 h-[38px] px-0.75 rounded-full bordered-clickable"
                        />
                    }
                </div>
            </div>

            <div className="mt-1 flex gap-x-1.5">
                {/* Posts */}
                <main className="mb-2 grow">
                    {!isLoading ?
                        postIds.length !== 0 ?
                            postIds.map((postId) => {
                                return (
                                    <PostCard
                                        key={postId}
                                        postId={postId}
                                        refreshPosts={refreshPosts}
                                        showDeleteButton
                                    />
                                );
                            }) :
                            <div className="mt-[100px] px-1 text-xl text-blue-light-custom-2 font-semibold text-center">
                                This community doesn't have any posts yet
                            </div>
                        : <></>}
                </main>

                {/* Community Information */}
                <InformationBar/>
            </div>
        </div>
    );
}

export default Community;
