import { FormEvent, useContext, useState } from "react";
import InformationBar from "../components/InformationBar.tsx";
import LabeledInput from "../../../components/LabeledInput/LabeledInput.tsx";
import { CommunityContext } from "../../../constants/contexts.ts";
import { api, getPrefixedCommunityName } from "../../../Utils.ts";
import { useNavigate } from "react-router";

function CreatePost() {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const { community } = useContext(CommunityContext)!;
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        api.post("posts", {
            title: title,
            content: body,
            communityName: community.name
        })
            .then((res) => {
                console.log(res);
                void navigate(`/${getPrefixedCommunityName(community.name)}/posts/${res.data.id}`);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div className="w-full flex justify-between">
            <div className="w-[732px] pt-1.25 px-1">
                <h1 className="text-[24px] font-bold text-blue-light-custom-3">Create post</h1>
                <div
                    className="mt-0.75 w-fit h-[38px] px-1 flex items-center text-sm font-semibold bg-gray-custom-2 rounded-2xl">
                    <span>{getPrefixedCommunityName(community.name)}</span>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <LabeledInput label="Title" value={title} setValue={setTitle}/>
                    <div className="mt-0.5 w-full flex justify-end">
                        <div className="text-xs text-blue-light-custom-3">{title.length}/300</div>
                    </div>

                    {/* Body Input */}
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.currentTarget.value)}
                        placeholder="Body"
                        className="mt-1.5 block w-full h-[154px] py-0.5 px-1 border border-white/20 rounded-2xl"
                    />

                    {/* Post Button */}
                    <div className="mt-1 w-full flex justify-end">
                        <button
                            type="submit"
                            disabled={title.length === 0}
                            className="bg-blue-800 hover:bg-blue-700 disabled:text-white/20 disabled:bg-white/5 h-[38px] px-1 flex items-center text-sm font-semibold rounded-full">
                            Post
                        </button>
                    </div>
                </form>
            </div>

            {/* Community Information */}
            <InformationBar/>
        </div>
    );
}

export default CreatePost;
