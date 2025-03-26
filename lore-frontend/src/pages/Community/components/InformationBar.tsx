import { useContext, useState } from "react";
import CommentInput from "../../../components/CommentInput.tsx";
import { getPrefixedCommunityName, getPrefixedUsername } from "../../../Utils.ts";
import { CommunityContext } from "../../../constants/contexts.ts";
import JoinButton from "./JoinButton.tsx";
import { Link } from "react-router";

function InformationBar() {
    const { community } = useContext(CommunityContext)!;
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    return (
        <div
            className="scrollable w-[320px] py-0.5 text-blue-light-custom-1"
            style={{ maxHeight: "calc(100vh - var(--header-height))" }}>
            <div
                className="mt-1 pt-0.5 px-1 text-sm rounded-t-lg bg-dark-dimmer border-b border-b-white/20">
                <div className="py-0.5 w-full flex justify-between items-center">
                    <a className="text-blue-light-custom-3 text-lg font-bold">
                        {getPrefixedCommunityName(community.name)}
                    </a>
                    <JoinButton className="py-0.5 px-0.75 text-xs text-white rounded-full bordered-clickable"/>
                </div>
                <div className="w-full flex justify-end items-center">

                </div>
                {
                    !isEditingDescription ?
                        (community.description ?
                                <div>
                                    {community.description}
                                    <button
                                        onClick={() => setIsEditingDescription(true)}
                                        className="
                                        ml-0.5
                                        text-white/50 hover:text-white/80 text-xs
                                        hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                                :
                                <button
                                    onClick={() => setIsEditingDescription(true)}
                                    className="text-white/50 hover:text-white/80 text-xs italic hover:underline">
                                    Write a description...
                                </button>
                        )
                        : <CommentInput
                            isActiveOnMount
                            handleCancelSuperior={() => setIsEditingDescription(false)}
                            commentButtonText="Save"
                        />
                }
                <div className="text-xs mt-0.5">- Created {new Date(community.createdAt).toDateString()}</div>
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
                    {/*<div className="w-1/2">*/}
                    {/*    <div className="text-white-custom font-[700]">*/}
                    {/*        5*/}
                    {/*    </div>*/}
                    {/*    <div className="text-xs">*/}
                    {/*        Online*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="h-[44px] px-1 pt-[10px] flex gap-x-1 items-baseline bg-dark-dimmer">
                <div className="text-xs text-white/70">
                    CREATOR
                </div>
                <Link to={`/${getPrefixedUsername(community.creator.username)}`}
                      className="text-sm hover:text-blue-light-custom-2">
                    {getPrefixedUsername(community.creator.username)}
                </Link>
            </div>
        </div>
    );
}

export default InformationBar;
