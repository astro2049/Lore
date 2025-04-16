import { useContext, useEffect, useState } from "react";
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
    const { updateCommunities, updateAllCommunities } = useContext(CommunitiesContext);
    const [nameAvailable, setNameAvailable] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit() {
        setIsSubmitting(true);
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
            .finally(() => {
                setIsSubmitting(false);
            })
    }

    useEffect(() => {
        if (name.length === 0) {
            return;
        }
        api.get<string>(`search?community=${name}`)
            .then((res) => {
                setNameAvailable(res.data !== "yes");
            })
            .catch((e) => {
                console.log(e);
            })
    }, [name]);

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
                        className="block mt-0.5 mb-0.5 w-full h-[40px] py-0.25 px-0.5 border border-white/20 rounded-xl"/>
                    <div className="mt-[6px] ml-1 flex justify-between text-xs">
                        {name.length !== 0 ? (nameAvailable ?
                                <span className="text-green-400">
                                    {`${getPrefixedCommunityName(name)} is available.`}
                                </span>
                                :
                                <span className="text-red-500">
                                    {`${getPrefixedCommunityName(name)} exists.`}
                                </span>
                        ) : <span></span>}
                        <span className="text-blue-light-custom-2">
                            {maxNameLength - name.length} Characters remaining
                        </span>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-1">
                    <h2 className="font-[700]">Description</h2>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block my-0.5 w-full h-[132px] py-0.25 px-0.5 border border-white/20 rounded-xl"/>
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
                        disabled={name.length === 0 || !nameAvailable || isSubmitting}
                        className="py-0.25 px-1 text-gray-custom-2 font-bold bg-white-custom rounded-2xl disabled:bg-white/20"
                    >
                        Create Community
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateCommunity;
