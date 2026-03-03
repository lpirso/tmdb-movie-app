import { setSearchTextAndClearGenre } from "../store/filtersSlice";
import { useAppDispatch } from "../store/hooks";

type RecentSearchesSidebarProps = {
    recentSearchHistory: string[];
    addRecentSearchText: (searchText: string) => void;
};

export const RecentSearchesSidebar = (props: RecentSearchesSidebarProps) => {
    const { recentSearchHistory, addRecentSearchText } = props;
    const dispatch = useAppDispatch();

    return (
        <aside>
            {recentSearchHistory.length > 0 ? (
                <div>
                    {recentSearchHistory.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                addRecentSearchText(item);
                                dispatch(setSearchTextAndClearGenre(item));
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            ) : (
                <p>No recent searches</p>
            )}
        </aside>
    );
};
