import { MoviesGrid } from "./MoviesGrid/MoviesGrid";
import { GenreSelect } from "./header/GenreSelect";
import { SearchInput } from "./header/SearchInput";

function App() {
    return (
        <>
            <header>
                <SearchInput />
                <GenreSelect />
            </header>
            <MoviesGrid />
        </>
    );
}

export default App;
