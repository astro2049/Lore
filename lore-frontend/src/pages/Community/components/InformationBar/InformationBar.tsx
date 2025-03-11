import { useState } from "react";
import CommentInput from "../../../../components/CommentInput/CommentInput.tsx";

function InformationBar() {
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    return (
        <div
            className="scrollable w-[320px] py-0.5 text-blue-light-custom-1"
            style={{ maxHeight: "calc(100vh - var(--header-height))" }}>
            <div
                className="my-1 pt-0.5 px-1 text-sm rounded-t-lg bg-dark-dimmer border-b border-b-white/20">
                <div className="py-0.5 w-full flex justify-between items-center">
                    <a className="text-blue-light-custom-3 text-lg font-bold">
                        c/Fortnite
                    </a>
                    <button className="py-0.5 px-0.75 text-xs text-white rounded-full bordered-clickable">
                        Join
                    </button>
                </div>
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-blue-light-custom-3 font-[700]">Marathon The Game | Reddit</h1>
                    <button
                        onClick={() => setIsEditingDescription(true)}
                        className="
                        mr-0.75
                        text-white/50 hover:text-white/80 text-xs
                        border-b border-white/30 hover:border-white/60
                        ">
                        Edit
                    </button>
                </div>
                {
                    !isEditingDescription ?
                        "The developer supported, community run subreddit dedicated to the Fortnite pew pew game modes by Epic Games."
                        : <CommentInput
                            isActiveOnMount
                            handleCancelSuperior={() => setIsEditingDescription(false)}
                            commentButtonText="Save"
                        />
                }
                <div className="text-xs mt-0.5">- Created Oct 24, 2008</div>
                <div className="text-xs mt-0.25">- Public</div>
                <div className="flex mt-0.5 mb-0.5">
                    <div className="w-1/2">
                        <div className="text-white-custom font-[700]">
                            13K
                        </div>
                        <div className="text-xs">
                            Members
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="text-white-custom font-[700]">
                            5
                        </div>
                        <div className="text-xs">
                            Online
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformationBar;
