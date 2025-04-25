import { useContext } from "react";
import { UserContext } from "../../constants/contexts.ts";
import { useNavigate, useParams } from "react-router";
import { api, getPrefixedUsername } from "../../Utils.ts";
import RestrictedOverlay from "../../components/RestrictedOverlay.tsx";

function InformationBar() {
    const { username } = useParams();
    const { isLoggedIn, username: loggedInUsername, clearLogInData } = useContext(UserContext);
    const navigate = useNavigate();

    function handleDeleteAccount() {
        api.delete(`users/${loggedInUsername}`)
            .then((res) => {
                console.log(res);
                // Log the user out and return to home page
                clearLogInData();
                void navigate("/");
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div
            className="scrollable shrink-0 w-[320px] pb-6"
            style={{ maxHeight: "calc(100vh - var(--header-height) - 1rem)" }}> {/* TODO: This 1rem is kinda hacky */}
            <div className="pt-0.5 text-sm rounded-t-lg bg-dark-dimmer">
                <div className="h-4">

                </div>
                <span className="block pb-0.5 px-1 font-semibold text-white-custom">
                    {getPrefixedUsername(username!)}
                </span>
                {isLoggedIn && loggedInUsername === username &&
                    <div className="relative px-1 py-0.75 border-t border-t-white/20">
                        <div>
                            <span className="block mb-0.5 uppercase text-xs text-white/70">
                                Delete account
                            </span>
                            <div className="flex flex-col gap-y-0.5 text-neutral-500">
                                <span>Once you delete your account,<br/></span>
                                <span>your profile and username will be permanently removed from lore,<br/></span>
                                <span>you&apos;ll leave the communities you joined,<br/></span>
                                <span>your votes will be retracted,</span>
                                <span>
                                    your posts and comments are disassociated (not deleted) and attributed to <span
                                    className="font-mono">u/deleted</span>.<br/></span>
                                <span>
                                    We encourage you to delete the contents you no longer wish to remain visible before
                                    deleting your account.<br/>
                                </span>
                            </div>
                            <button
                                onClick={handleDeleteAccount}
                                className="mt-0.5 text-red-500 hover:underline"
                            >
                                Delete account
                            </button>
                        </div>

                        {/* Restricted Overlay (production) */}
                        <RestrictedOverlay/>
                    </div>
                }
            </div>
        </div>
    );
}

export default InformationBar;
