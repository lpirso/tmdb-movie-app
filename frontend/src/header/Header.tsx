import { GenreSelect } from "../header/GenreSelect";
import { SearchInput } from "../header/SearchInput";

type HeaderInputProps = {
    addRecentSearchText: (searchText: string) => void;
};

export const Header = (props: HeaderInputProps) => {
    const { addRecentSearchText } = props;
    
    return (
        <header>
            <SearchInput addRecentSearchText={addRecentSearchText} />
            <GenreSelect />
        </header>
    );
};
