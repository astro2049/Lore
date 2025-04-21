import { useContext } from "react";
import { UserContext } from "../../constants/contexts.ts";
import InfiniteScroll from "../../components/InfiniteScroll.tsx";
import PostCard from "../../components/cards/PostCard/PostCard.tsx";

function Feed() {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <div className="w-full">
            {!isLoggedIn ?
                <div className="mt-[30%] text-3xl text-center"> {/* Welcome page */}
                    <span className="italic block font-serif tracking-wide">Welcome to</span>
                    <span className="font-semibold">lore</span>
                </div>
                :
                <div className="flex gap-x-1.5"> {/* Posts from joined communities */}
                    <div className="w-full pt-1 pb-2">
                        <div className="px-1">
                            <h1 className="text-[24px] font-bold">
                                Daily Feed
                            </h1>
                            <span className="block py-1 text-xs text-blue-light-custom-2">
                                New
                            </span>
                        </div>
                        {isLoggedIn &&
                            <InfiniteScroll<string>
                                itemsUrl="feed"
                                renderItem={(postId) => {
                                    return (
                                        <PostCard
                                            key={postId}
                                            displayCommunity
                                            postId={postId}
                                        />
                                    );
                                }}
                                empty={
                                    <div
                                        className="mt-[100px] text-xl text-blue-light-custom-2 font-semibold text-center">
                                        No posts from communities yet
                                    </div>
                                }
                            />
                        }
                    </div>
                    <div className="shrink-0 w-[320px]"></div>
                </div>
            }
        </div>
    );
}

export default Feed;
