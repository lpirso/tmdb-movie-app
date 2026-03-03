import { setSearchTextAndClearGenre } from "../../store/filtersSlice";
import { useAppDispatch } from "../../store/hooks";
import { Button, Paragraph } from "../shared.styles";
import { RecentSearchesWrapper } from "./RecentSearches.styles";

type RecentSearchesProps = {
    recentSearchHistory: string[];
    addRecentSearchText: (searchText: string) => void;
};

export const RecentSearches = (props: RecentSearchesProps) => {
    const { recentSearchHistory, addRecentSearchText } = props;
    const dispatch = useAppDispatch();

    const text = recentSearchHistory.length > 0 ? "Recent searches:" : "No recent searches";

    return (
        <RecentSearchesWrapper>
            <Paragraph>{text}</Paragraph>

            {recentSearchHistory.length > 0 &&
                recentSearchHistory.map((item) => (
                    <Button
                        key={item}
                        onClick={() => {
                            addRecentSearchText(item);
                            dispatch(setSearchTextAndClearGenre(item));
                        }}
                    >
                        {item}
                    </Button>
                ))}
        </RecentSearchesWrapper>
    );
};
