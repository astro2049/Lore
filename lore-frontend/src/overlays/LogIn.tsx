import { OverlayType } from "../constants/types.ts";
import { FormEvent, useContext, useEffect, useState } from "react";
import { OverlayContext, UserContext } from "../constants/contexts.ts";
import LabeledInput from "../components/LabeledInput/LabeledInput.tsx";
import { api } from "../Utils.ts";
import CancelButton from "./components/CancelButton.tsx";

type LoginResponseData = {
    access_token: string
}

function LogIn() {
    const { setOverlayType } = useContext(OverlayContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { storeLogInData } = useContext(UserContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showLogInError, setShowLogInError] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        api.post<LoginResponseData>("auth/login", {
            username: username,
            password: password
        })
            .then((res) => {
                console.log(res);
                setOverlayType(OverlayType.None);
                storeLogInData(username);
                // window.location.reload();
            })
            .catch((e) => {
                console.log(e);
                setShowLogInError(true);
            })
            .finally(() => {
                setIsSubmitting(false);
            })
    }

    useEffect(() => {
        setShowLogInError(false);
    }, [username, password]);

    return (
        <div className="w-[500px] pt-1 px-1 pb-3 bg-dark rounded-2xl">
            {/* Heading */}
            <div className="pb-0.75 flex w-full justify-end items-center">
                <CancelButton/>
            </div>
            {/* Body */}
            <div className="px-3 flex flex-col grow">
                <h1 className="text-center text-2xl font-[700] text-white-custom">Log In</h1>
                <form onSubmit={handleSubmit}>
                    {/* Labeled Inputs */}
                    <LabeledInput
                        label="Username"
                        value={username}
                        setValue={setUsername}
                        disabled={isSubmitting}
                    />
                    <LabeledInput
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        disabled={isSubmitting}
                    />

                    {/* Prompt: username and password don't match */}
                    <div className={`mt-0.25 text-sm text-red-500 ${!showLogInError && "invisible"}`}>
                        Incorrect username or password.
                    </div>

                    {/* text prompt for Sign Up */}
                    <div className="mt-0.5 text-sm text-blue-light-custom-3">
                        New to Lore?
                        <button
                            type="button"
                            onClick={() => setOverlayType(OverlayType.SignUp)}
                            className="ml-0.25 text-blue-500"
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Log In Button */}
                    <button
                        type="submit"
                        disabled={username.length === 0 || password.length === 0 || isSubmitting}
                        className="mt-2.5 w-full py-0.5 px-1 text-dark font-bold bg-white-custom rounded-2xl disabled:bg-white/20"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;
