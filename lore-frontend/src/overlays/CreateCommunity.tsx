import { useContext, useState } from "react";
import { CommunitiesContext, OverlayContext } from "../constants/contexts.ts";
import { OverlayType } from "../constants/types.ts";
import { useNavigate } from "react-router";
import { api, getPrefixedCommunityName } from "../Utils.ts";
import CancelButton from "./components/CancelButton.tsx";

const maxNameLength = 22;

function CreateCommunity() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { setOverlayType } = useContext(OverlayContext);
    const navigate = useNavigate();
    const { updateCommunities, updateAllCommunities } = useContext(CommunitiesContext)!;

    function handleSubmit() {
        api.post("communities", {
            name: name,
            description: description
        })
            .then((res) => {
                console.log(res);
                setOverlayType(OverlayType.None);
                void navigate(getPrefixedCommunityName(name));
                updateCommunities();
                updateAllCommunities();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div className="bg-dark rounded-2xl">
            <div className="p-2">
                {/* Heading */}
                <div className="pb-0.75 flex w-full justify-between items-center">
                    <h1 className="text-xl font-[700] text-blue-light-custom-3">Create a community</h1>
                    <CancelButton/>
                </div>

                {/* Name */}
                <div className="mt-1">
                    <h2 className="text-lg font-[700]">Name</h2>
                    <div className="text-sm text-blue-light-custom-2">
                        Community names including capitalization cannot be changed.
                    </div>

                    <input
                        value={name}
                        maxLength={maxNameLength}
                        onChange={(e) => setName(e.target.value)}
                        className="block mt-0.5 mb-0.5 w-full h-[40px] py-0.5 px-0.25 border border-white/20 rounded-lg"/>
                    <div className="text-xs text-blue-light-custom-2">
                        {maxNameLength - name.length} Characters remaining
                    </div>
                </div>

                <div className="mt-1">
                    <h2 className="font-[700]">Description</h2>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block mt-0.5 mb-0.5 w-full h-[96px] py-0.5 px-0.25 border border-white/20 rounded-lg"/>
                </div>

                {/* Community type */}
                <div className="mt-2">
                    <h2 className="mb-0.5 text-lg font-[700]">Community type</h2>
                    <input type="radio" name="visibility" checked readOnly/>
                    <label>
                        <span className="inline-block mx-0.75 font-bold">Public</span>
                        <span className="inline-block mr-0.75 text-sm text-blue-light-custom-2">
                            Anyone can view, post, and comment to this community
                        </span>
                    </label>
                </div>
            </div>

            <div className="mt-2 p-1 bg-white/5 rounded-b-2xl">
                <div className="flex w-full justify-end gap-1">
                    <button
                        onClick={() => setOverlayType(OverlayType.None)}
                        className="py-0.25 px-1 font-bold border border-white-custom rounded-2xl"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="py-0.25 px-1 text-gray-custom-2 font-bold bg-white-custom rounded-2xl"
                    >
                        Create Community
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateCommunity;
