import { Link } from "react-router";
import { api, getPrefixedCommunityName } from "../../Utils.ts";
import PostCard from "../../components/PostCard/PostCard.tsx";
import icon_cross from "../../assets/icon-cross.svg"
import InformationBar from "./components/InformationBar.tsx";
import { useContext, useEffect, useState } from "react";
import { CommunityContext } from "../../constants/contexts.ts";
import JoinButton from "./components/JoinButton.tsx";
import { Post } from "../../constants/types.ts";

function Community() {
    const { community } = useContext(CommunityContext)!;
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        api.get<Post[]>(`communities/${community.name}/posts`)
            .then((res) => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [community]);

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
            <div className="-mt-2.25 px-1 flex justify-between items-end">
                <div className="flex items-end">
                    <div className="w-[88px] h-[88px]"></div>
                    <h1 className="ml-[-88px] text-3xl font-bold">{getPrefixedCommunityName(community.name)}</h1>
                </div>
                <div className="flex items-end">
                    <Link to="./submit"
                          className="h-[38px] px-0.75 flex items-center text-sm font-semibold rounded-full bordered-clickable">
                        <img src={icon_cross} alt=""/>
                        <span className="ml-0.25">Create Post</span>
                    </Link>
                    <JoinButton
                        className="ml-1 h-[38px] px-0.75 text-sm font-semibold rounded-full bordered-clickable"/>
                </div>
            </div>

            <div className="mt-1 flex gap-x-1.5">
                {/* Posts */}
                <main className="mb-2 grow">
                    {!isLoading ?
                        posts.length !== 0 ?
                            posts.map((post) => {
                                return (
                                    <PostCard
                                        key={post.id}
                                        link={`posts/${post.id}`}
                                        {...post}
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
