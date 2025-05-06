import { Outlet, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../Utils.ts";
import { CommunityContext } from "../../constants/contexts.ts";
import { Community } from "../../constants/types.ts";

function CommunityProvider() {
    const { community: name } = useParams();
    const [community, setCommunity] = useState<Community | undefined>();
    const [page, setPage] = useState(0);

    const refreshCommunity = useCallback(() => {
        api.get<Community>(`communities/${name}`)
            .then((res) => {
                console.log(res.data);
                setCommunity(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [name])

    // When community name changes, refresh community info and set page to 0
    useEffect(() => {
        refreshCommunity();
    }, [refreshCommunity]);

    return (
        <CommunityContext.Provider value={{
            community: community!,
            refreshCommunity: refreshCommunity,
            page: page,
            setPage: setPage
        }}>
            {community && <Outlet/>}
        </CommunityContext.Provider>
    );
}

export default CommunityProvider;
