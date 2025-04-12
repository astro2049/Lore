import { Outlet, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../Utils.ts";
import { CommunityContext } from "../../constants/contexts.ts";
import { Community } from "../../constants/types.ts";

function CommunityLayout() {
    const { community: name } = useParams();
    const [community, setCommunity] = useState<Community | undefined>();

    const refreshCommunity = useCallback(() => {
        api.get(`communities/${name}`)
            .then((res) => {
                console.log(res.data);
                setCommunity(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [name])

    useEffect(() => {
        refreshCommunity();
    }, [refreshCommunity]);

    return (
        <CommunityContext.Provider value={{
            community: community!,
            refreshCommunity: refreshCommunity
        }}>
            {community && <Outlet/>}
        </CommunityContext.Provider>
    );
}

export default CommunityLayout;
