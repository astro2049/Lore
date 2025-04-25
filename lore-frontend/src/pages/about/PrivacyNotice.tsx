import { Link } from "react-router";

function PrivacyNotice() {
    return (
        <main className="p-4 pb-0 text-neutral-300 text-sm">
            <h1 className="text-2xl font-bold">Privacy Notice</h1>
            <p>
                Last updated: 25 April 2025
            </p>

            <section className="mt-2">
                <h2 className="text-xl font-semibold">About lore</h2>
                <p>
                    Welcome to lore — a non-commercial demo forum created purely
                    to showcase web-development skills, built and maintained by a single developer (me).<br/>
                </p>
                <p>
                    This site is for demonstration purposes only and is not intended for production
                    use.
                </p>
            </section>

            <section className="mt-2">
                <h2 className="text-xl font-semibold">Demo Accounts & Posting</h2>
                <p>
                    You can explore and post in any community using our shared, anonymous demo account — no signup
                    required!
                </p>
                <p>
                    As this is a demo site only, please do not submit any personal or sensitive information.
                </p>
            </section>

            <section className="mt-2">
                <h2 className="text-xl font-semibold">Data Collection & Use</h2>
                <p>
                    Only data essential for demonstrating forum functionality are collected, specifically:
                    <ul className="mt-0.5 ml-1 list-inside list-disc">
                        <li>
                            Communities (and their creators and members)
                        </li>
                        <li>
                            Posts, comments, and votes
                        </li>
                    </ul>
                </p>
                <p>
                    No personal data, as defined under GDPR Article 4 (1), is collected or stored.<br/>
                    No tracking, analytics, or third-party data services are implemented or used.
                </p>
            </section>

            <Link
                to="/"
                className="block mt-2 hover:underline"
                aria-label="Return to home page"
            >
                &lt; Return to Home
            </Link>
        </main>
    );
}

export default PrivacyNotice;
