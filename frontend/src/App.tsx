import { MoviesGrid } from "./components/moviesGrid/MoviesGrid";
import { Header } from "./components/header/Header";
import { RecentSearches } from "./components/recentSearches/RecentSearches";
import { useRecentSearchesHistory } from "./hooks/useRecentSearchesHistory";

export const App = () => {
    const {
        recentSearchHistory,
        addRecentSearchText,
    } = useRecentSearchesHistory();

    return (
        <>
            <Header addRecentSearchText={addRecentSearchText} />
            <RecentSearches
                addRecentSearchText={addRecentSearchText}
                recentSearchHistory={recentSearchHistory}
            />
            <MoviesGrid />
        </>
    );
};

export default App;
