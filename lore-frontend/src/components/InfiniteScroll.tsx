import { cloneElement, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { api } from "../Utils.ts";

type InfiniteScrollProps<T> = {
    itemsUrl: string,
    /* Render-prop for each item */
    renderItem: (item: T) => ReactElement,
    /* What if the list is empty? */
    empty: ReactNode
}

function InfiniteScroll<T>({
                               itemsUrl,
                               renderItem,
                               empty
                           }: InfiniteScrollProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedItems, setLoadedItems] = useState<Set<T>>(new Set());
    const nowRef = useRef(new Date());

    const observerRef = useRef<IntersectionObserver | null>(null);
    const showSentinel = hasMore && !isLoading && items.length === loadedItems.size;

    useEffect(() => {
        console.log("cards loaded:" + loadedItems.size);
    }, [loadedItems]);

    const loadMore = useCallback(() => {
        setIsLoading(true);
        api.get<T[]>(`${itemsUrl}?page=${page}&before=${nowRef.current.toISOString()}`)
            .then((res) => {
                console.log(res.data);
                setHasMore(res.data.length > 0);
                setItems(prev => [...prev, ...res.data]);
                setPage(prev => prev + 1);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setHasMore(false);
                setIsLoading(false);
            })
    }, [itemsUrl, page]);

    function handleItemLoaded(id: T) {
        setLoadedItems(prev => new Set([...prev, id]));
    }

    const sentinelRef = useCallback((sentinel: HTMLDivElement | null) => {
        observerRef.current?.disconnect();
        if (!sentinel) {
            return;
        }
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: "200px" }
        );
        observerRef.current.observe(sentinel);
    }, [loadMore]);

    return (<>
        {items.length === 0 && !hasMore && empty}
        {items.map((item) => {
            return cloneElement(
                renderItem(item),
                { onLoad: handleItemLoaded }
            );
        })}
        {isLoading && <div className="pt-2 text-center text-blue-light-custom-1">Loading...</div>}
        {/*{items.length > 0 && !hasMore &&*/}
        {/*    <div className="pt-2 text-center text-blue-light-custom-1 border-t border-t-white/10">*/}
        {/*        /!* placeholder message *!/*/}
        {/*    </div>*/}
        {/*}*/}
        {showSentinel && <div ref={sentinelRef}></div>}
    </>);
}

export default InfiniteScroll;
