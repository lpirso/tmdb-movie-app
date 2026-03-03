import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearchTextAndClearGenre, clearSearch } from "../store/filtersSlice";

export const SearchInput = () => {
    const dispatch = useAppDispatch();
    const { searchText } = useAppSelector((state) => state.filters);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        setUserInput(searchText);
    }, [searchText]);

    const submitSearch = () => {
        const trimmedUserInput = userInput.trim();
        if (!trimmedUserInput) return;

        dispatch(setSearchTextAndClearGenre(trimmedUserInput));
    };

    const emptySearch = () => {
        dispatch(clearSearch());
        setUserInput("");
    }
    
    return (
        <>
            <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Search movie by title…"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        submitSearch();
                    }
                }}
            />

            {searchText ? (
                <button onClick={emptySearch}>Clear</button>
            ) : null}
        </>
    );
};
