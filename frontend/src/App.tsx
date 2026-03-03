import { MoviesGrid } from "./moviesGrid/MoviesGrid";
import { Header } from "./header/Header";
import { RecentSearchesSidebar } from "./recentSearchesSidebar/RecentSearchesSidebar";
import { useRecentSearchesHistory } from "./hooks/useRecentSearchesHistory";

export const App = () => {
    const {
        recentSearchHistory,
        addRecentSearchText,
    } = useRecentSearchesHistory();

    return (
        <>
            <Header addRecentSearchText={addRecentSearchText} />
            <RecentSearchesSidebar
                addRecentSearchText={addRecentSearchText}
                recentSearchHistory={recentSearchHistory}
            />
            <MoviesGrid />
        </>
    );
};

export default App;
