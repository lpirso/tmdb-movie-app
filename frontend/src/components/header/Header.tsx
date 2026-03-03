import { GenreSelect } from "./GenreSelect";
import { SearchInput } from "./searchInput/SearchInput";
import styled from "styled-components";

type HeaderInputProps = {
    addRecentSearchText: (searchText: string) => void;
};

export const StyledHeader = styled.header`
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    padding: 10px;
    display: grid;
    gap: 10px;

    @media(min-width: 768px) {
        grid-template-columns: 200px 1fr;
        gap: 20px;
        justify-content: space-between;
    }
`;

export const Header = (props: HeaderInputProps) => {
    const { addRecentSearchText } = props;
    
    return (
        <StyledHeader>
            <GenreSelect />
            <SearchInput addRecentSearchText={addRecentSearchText} />
        </StyledHeader>
    );
};
