import { OverlayType } from "../constants/types.ts";
import { FormEvent, useContext, useEffect, useState } from "react";
import { OverlayContext, UserContext } from "../constants/contexts.ts";
import LabeledInput from "../components/LabeledInput/LabeledInput.tsx";
import { api } from "../Utils.ts";
import CancelButton from "./components/CancelButton.tsx";
import { Link } from "react-router";

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
        <div className="relative w-[500px] pt-1 px-1 pb-3 bg-dark rounded-2xl">
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
                    {/* privacy notice */}
                    <div className="italic mt-1.5 text-sm text-blue-light-custom-2 break-words hyphens-auto">
                        By continuing, you agree that you have read and understood the&nbsp;
                        <Link to={"/privacy-notice"} className="text-blue-500">Privacy Notice</Link>
                    </div>

                    {/* Log In Button */}
                    <button
                        type="submit"
                        disabled={username.length === 0 || password.length === 0 || isSubmitting}
                        className="mt-0.75 w-full py-0.5 px-1 text-dark font-bold bg-white-custom rounded-2xl disabled:bg-white/20"
                    >
                        Log In
                    </button>
                </form>
            </div>

            <div className="absolute top-0 left-[105%] w-[250px] h-[100%] p-2 text-white-custom bg-dark rounded-2xl">
                <div className="mt-2 font-semibold">Demo Accounts (5):</div>
                <div className="text-sm text-blue-light-custom-2">Passwords are the same as the account names.</div>
                <ul className="mt-1 text-sm list-inside list-disc">
                    <li>tron</li>
                    <li>pathfinder</li>
                    <li>Isaac</li>
                    <li>Frosty_</li>
                    <li>martian87</li>
                </ul>
                <div className="mt-2 text-sm text-blue-light-custom-2">
                    <span className="font-semibold">Privacy Reminder:</span>
                    &nbsp;This site is for demo purposes only. Please do not submit any personal or sensitive
                    information.
                </div>
            </div>
        </div>
    );
}

export default LogIn;
