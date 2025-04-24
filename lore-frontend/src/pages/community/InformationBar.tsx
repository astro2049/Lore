import { useContext, useState } from "react";
import CommentInput from "../../components/CommentInput.tsx";
import { getPrefixedCommunityName } from "../../Utils.ts";
import { CommentInputContext, CommunitiesContext, CommunityContext, UserContext } from "../../constants/contexts.ts";
import JoinButton from "../../components/JoinButton.tsx";
import { useNavigate } from "react-router";
import { CommentInputMode } from "../../constants/types.ts";
import DeleteButton from "../../components/DeleteButton.tsx";
import ProfileLink from "../../components/ProfileLink.tsx";

function InformationBar() {
    const { community, refreshCommunity } = useContext(CommunityContext);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const { isLoggedIn, username } = useContext(UserContext);
    const { updateCommunities, updateAllCommunities } = useContext(CommunitiesContext);
    const navigate = useNavigate();

    function description() {
        if (isEditingDescription) {
            return (
                <CommentInputContext value={{
                    onComment: refreshCommunity
                }}>
                    <CommentInput
                        isActiveOnMount
                        handleCancelSuperior={() => setIsEditingDescription(false)}
                        commentButtonText="Save"
                        targetIdOrName={community!.name}
                        mode={CommentInputMode.CommunityDescription}
                        value={community!.description}
                    />
                </CommentInputContext>
            );
        } else {
            if (community!.description) {
                return (
                    <div className="whitespace-pre-line">
                        {community!.description}
                        {isLoggedIn && username === community!.creator?.username &&
                            <button
                                onClick={() => setIsEditingDescription(true)}
                                className="ml-0.5 text-white/50 hover:text-white/80 text-xs hover:underline">
                                Edit
                            </button>
                        }
                    </div>
                );
            } else if (isLoggedIn && username === community!.creator?.username) {
                return (
                    <button
                        onClick={() => setIsEditingDescription(true)}
                        className="text-white/50 hover:text-white/80 text-xs hover:underline">
                        Write a description...
                    </button>
                );
            }
        }
    }

    return (
        <div
            className="scrollable shrink-0 w-[320px] pb-6 text-blue-light-custom-1"
            style={{ maxHeight: "calc(100vh - var(--header-height) - 102px)" }}> {/* TODO: This 102px is kinda hacky */}
            {/* Section 1: Community Info */}
            <div className="pt-0.5 px-1 text-sm rounded-t-lg bg-dark-dimmer border-b border-b-white/20">
                {/* 1. Title, Join Button */}
                <div className="py-0.5 w-full flex justify-between items-start">
                    <span className="text-blue-light-custom-3 text-lg font-bold">
                        {getPrefixedCommunityName(community!.name)}
                    </span>
                    <JoinButton className="shrink-0 py-0.5 px-0.75 text-xs text-white rounded-full bordered-clickable"/>
                </div>
                {/* 2. Description / TextArea for editing description */}
                {description()}
                {/* 3. Created At */}
                <div className="text-xs mt-0.5">- Created {new Date(community!.createdAt).toDateString()}</div>
                {/* 4. Visibility */}
                <div className="text-xs mt-0.25">- Public</div>
                {/* 5. Members Count */}
                <div className="flex mt-0.5 mb-0.5">
                    <div className="w-1/2">
                        <div className="text-white-custom font-[700]">
                            {community!.memberCount}
                        </div>
                        <div className="text-xs">
                            {`Member${community!.memberCount === 1 ? "" : "s"}`}
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
            {/* Section 2: Creator */}
            <div className="h-[44px] px-1 pt-[10px] flex gap-x-1 items-baseline bg-dark-dimmer">
                <div className="text-xs text-white/70">
                    CREATOR
                </div>
                <ProfileLink
                    username={community!.creator?.username}
                    className="text-sm hover:text-blue-light-custom-2"
                />
            </div>
            {isLoggedIn && username === community!.creator?.username &&
                <div className="px-1 pb-1 flex gap-x-1 bg-dark-dimmer">
                    <div className="text-xs text-white/70">
                        ACTIONS
                    </div>
                    <DeleteButton
                        link={`communities/${community!.name}`}
                        onDelete={() => {
                            updateCommunities();
                            updateAllCommunities();
                            void navigate("/");
                        }}
                        className="text-xs text-white/50 hover:text-red-500 hover:underline"
                        text={`Delete ${getPrefixedCommunityName(community!.name)}`}
                    />
                </div>
            }
        </div>
    );
}

export default InformationBar;
