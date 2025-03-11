import { useContext } from "react";
import { OverlayContext } from "../../constants/contexts.ts";
import { OverlayType } from "../../constants/types.ts";
import icon_cross from "../../assets/icon-cross-rotated.svg"

function CreateCommunity() {
    const [, setOverlayType] = useContext(OverlayContext)!;

    return (
        <div className="bg-zinc-900 rounded-2xl">
            <div className="p-2">
                {/* Heading */}
                <div className="pb-0.75 flex w-full justify-between items-center">
                    <h1 className="text-xl font-[700] text-blue-light-custom-3">Create a community</h1>
                    <button
                        onClick={() => setOverlayType(OverlayType.None)}
                        className="p-[6px] border-2 border-transparent hover:border-white/20 rounded-full"
                    >
                        <img src={icon_cross} alt="Cancel"/>
                    </button>
                </div>

                {/* Name */}
                <div className="mt-1">
                    <h2 className="text-lg font-[700]">Name</h2>
                    <div className="text-sm text-blue-light-custom-2">
                        Community names including capitalization cannot be changed.
                    </div>

                    <input
                        className="block mt-1 mb-0.5 w-full h-[40px] py-0.5 px-0.25 border border-white/20 rounded-lg"/>
                    <div className="text-xs text-blue-light-custom-2">
                        2 Characters remaining
                    </div>
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

            <div className="mt-2 p-1 bg-zinc-800 rounded-b-2xl">
                <div className="flex w-full justify-end gap-1">
                    <button
                        onClick={() => setOverlayType(OverlayType.None)}
                        className="py-0.25 px-1 font-bold border-2 border-white-custom rounded-2xl"
                    >
                        Cancel
                    </button>
                    <button
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
