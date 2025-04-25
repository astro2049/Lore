import { OverlayType } from "../constants/types.ts";
import { FormEvent, useContext, useEffect, useState } from "react";
import { OverlayContext, PopupContext } from "../constants/contexts.ts";
import LabeledInput from "../components/LabeledInput/LabeledInput.tsx";
import { api, getPrefixedUsername } from "../Utils.ts";
import CancelButton from "./components/CancelButton.tsx";
import RestrictedOverlay from "../components/RestrictedOverlay.tsx";

const maxUsernameLength = 22, maxPasswordLength = 31;

function SignUp() {
    const { setOverlayType } = useContext(OverlayContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { showPopup } = useContext(PopupContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(true);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        api.post("users", {
            username: username,
            password: password
        })
            .then((res) => {
                console.log(res);
                showPopup("You have created an account!");
                setOverlayType(OverlayType.LogIn);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setIsSubmitting(false);
            })
    }

    useEffect(() => {
        if (username.length === 0) {
            return;
        }
        api.get<string>(`search?username=${username}`)
            .then((res) => {
                setUsernameAvailable(res.data !== "yes");
            })
            .catch((e) => {
                console.log(e);
            })
    }, [username]);

    return (
        <div className="w-[500px] pt-1 px-1 pb-3 bg-dark rounded-2xl">
            {/* Heading */}
            <div className="pb-0.75 flex w-full justify-end items-center">
                <CancelButton/>
            </div>
            <div className="px-3 flex flex-col grow">
                <h1 className="text-center text-2xl font-[700] text-white-custom">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        {/* Labeled Inputs */}
                        <LabeledInput
                            label="Username"
                            value={username}
                            maxLength={maxUsernameLength}
                            setValue={setUsername}
                        />
                        <div className="mt-[6px] ml-1 flex justify-between text-xs">
                            {username.length !== 0 ? (usernameAvailable ?
                                    <span className="text-green-400">
                                    {`${getPrefixedUsername(username)} is available.`}
                                </span>
                                    :
                                    <span className="text-red-500">
                                    This username is taken.
                                </span>
                            ) : <span></span>}
                            <span className="text-blue-light-custom-2">
                            {maxUsernameLength - username.length} Characters remaining
                        </span>
                        </div>
                        <LabeledInput
                            label="Password"
                            value={password}
                            maxLength={maxPasswordLength}
                            setValue={setPassword}
                        />
                        <div className="mt-[6px] ml-1 text-right text-xs text-blue-light-custom-2">
                            {maxPasswordLength - password.length} Characters remaining
                        </div>

                        {/* Restricted Overlay (production) */}
                        <RestrictedOverlay/>
                    </div>

                    {/* text prompt for Log In */}
                    <div className="mt-0.5 text-sm text-blue-light-custom-3">
                        Already have an account?
                        <button
                            type="button"
                            onClick={() => setOverlayType(OverlayType.LogIn)}
                            className="ml-0.25 text-blue-500"
                        >
                            Log In
                        </button>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        disabled={username.length === 0 || password.length === 0 || !usernameAvailable || isSubmitting}
                        className="mt-2.5 w-full py-0.5 px-1 text-dark font-bold bg-white-custom rounded-2xl disabled:bg-white/20"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
