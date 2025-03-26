import { Link } from "react-router";
import { getPrefixedCommunityName } from "../../Utils.ts";
import PostCard, { PostCardProps } from "../../components/PostCard/PostCard.tsx";
import star_wars_outlaws_concept_art from "../../assets/tony-tran-mirogana-city-01.jpg"
import icon_cross from "../../assets/icon-cross.svg"
import InformationBar from "./components/InformationBar.tsx";
import { useContext } from "react";
import { CommunityContext } from "../../constants/contexts.ts";
import JoinButton from "./components/JoinButton.tsx";

const posts: PostCardProps[] = [
    {
        link: "./posts/1",
        author: "Me",
        createdTimestamp: new Date().toDateString(),
        postTitle: "TITLE",
        coverUrl: star_wars_outlaws_concept_art,
        score: 120,
        commentCount: 38
    },
    {
        link: "./posts/2",
        author: "Me",
        createdTimestamp: new Date().toDateString(),
        postTitle: "TITLE",
        coverUrl: star_wars_outlaws_concept_art,
        score: 120,
        commentCount: 38
    },
    {
        link: "./posts/3",
        author: "Me",
        createdTimestamp: new Date().toDateString(),
        postTitle: "TITLE",
        coverUrl: star_wars_outlaws_concept_art,
        score: 120,
        commentCount: 38
    }
];

function Community() {
    const { community } = useContext(CommunityContext)!;

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

            <div className="mt-1 flex w-full justify-between">
                {/* Posts */}
                <main className="mb-2 w-[732px]">
                    {
                        posts.map((post, index) => {
                            return (
                                <PostCard key={index} {...post}/>
                            );
                        })
                    }
                </main>

                {/* Community Information */}
                <InformationBar/>
            </div>
        </div>
    );
}

export default Community;
