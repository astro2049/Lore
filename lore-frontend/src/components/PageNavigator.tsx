import { Link } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CommunityContext } from "../constants/contexts.ts";
import { getPrefixedCommunityName } from "../Utils.ts";

type PageNavigatorProps = {
    page: number
}

function PageNavigator({
                           page
                       }: PageNavigatorProps) {
    const { community } = useContext(CommunityContext);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);

    useEffect(() => {
        const start = page - page % 10;
        const end = Math.min(start + 9, community!.pages - 1);

        const a: number[] = [];
        for (let i = start; i <= end; i++) {
            a.push(i);
        }
        setPageNumbers(a);
    }, [page, community]);

    if (!community) {
        return <></>;
    }

    return (
        <div className="my-1 text-white-custom">
            <div className="text-center text-2xl font-bold">lore</div>
            <div className="mt-0.5 flex w-full justify-center items-center gap-x-1 text-sm">
                <Link
                    to={`/${getPrefixedCommunityName(community.name)}?page=${page - 1}`}
                    className="w-5 text-center hover:underline"
                >
                    {page !== 0 ? "Previous" : ""}
                </Link>
                <div className="flex gap-x-0.75">
                    {pageNumbers.map((pageNumber: number) => {
                        if (page === pageNumber) {
                            return pageNumber;
                        } else {
                            return (
                                <Link
                                    key={pageNumber}
                                    to={`/${getPrefixedCommunityName(community.name)}?page=${pageNumber}`}
                                    className={"text-lime-500 hover:underline"}
                                >
                                    {pageNumber}
                                </Link>
                            );
                        }
                    })}
                </div>
                <Link
                    to={`/${getPrefixedCommunityName(community.name)}?page=${page + 1}`}
                    className="w-5 text-center hover:underline"
                >
                    {page !== community.pages - 1 ? "Next" : ""}
                </Link>
            </div>
        </div>
    );
}

export default PageNavigator;
