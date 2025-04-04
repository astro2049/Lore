import { useContext, useEffect, useState } from "react";
import { api } from "../../Utils.ts";
import { Post } from "../../constants/types.ts";
import { UserContext } from "../../constants/contexts.ts";
import PostCard from "../../components/PostCard/PostCard.tsx";

function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const { username } = useContext(UserContext)!;

    // TODO: username is for display only. Refactor this.
    useEffect(() => {
        if (!username) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        api.get<Post[]>(`feed?page=${page}`)
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
    }, [username, page]);

    // Returns elements to display
    function feed() {
        // - Nothing if loading
        if (isLoading) {
            return <>Loading...</>;
        }

        // - Front page if not logged in
        if (!username) {
            return (
                <div className="mt-[100px] text-2xl italic text-center">
                    <span className="">Welcome to</span>
                    <span className="ml-0.5 font-semibold">Lore</span>
                </div>
            );
        }

        // - Or, the user's communities' posts
        return (
            <div className="flex gap-x-1.5">
                <div className="w-full">
                    <div className="py-1 text-xs text-blue-light-custom-2 border-b border-b-white/20">
                        New
                    </div>
                    {posts.length === 0 ?
                        <div className="grow mt-[100px] text-xl text-blue-light-custom-2 font-semibold text-center">
                            No posts from communities yet
                        </div> :
                        (<div className="grow">{
                            posts.map((post) => {
                                return (
                                    <PostCard
                                        key={post.id}
                                        displayCommunity
                                        link={`c/${post.community.name}/posts/${post.id}`}
                                        {...post}
                                    />
                                );
                            })
                        }</div>)
                    }
                </div>
                <div className="shrink-0 w-[320px]"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {feed()}
        </div>
    );
}

export default Feed;
