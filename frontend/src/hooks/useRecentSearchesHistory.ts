import { useState } from "react";
import {
    getRecentSearchesFromLocalStorage,
    saveRecentSearches,
} from "../utils/recentSearches";

export function useRecentSearchesHistory() {
    const [recentSearchHistory, setRecentSearchHistory] = useState<string[]>(
        getRecentSearchesFromLocalStorage(),
    );

    const addRecentSearchText = (searchText: string) => {
        saveRecentSearches(searchText);
        setRecentSearchHistory(getRecentSearchesFromLocalStorage());
    };

    return { recentSearchHistory, addRecentSearchText };
}
