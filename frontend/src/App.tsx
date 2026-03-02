import './App.css';
import { useSearchMoviesByTitleQuery, useGetGenresQuery, useGetMoviesQuery } from './store/tmdbApi';

function App() {

  const searchByTitle = useSearchMoviesByTitleQuery({title: 'lord'});
  const genres = useGetGenresQuery();
  const topVoted = useGetMoviesQuery(undefined);
  const topVotedInSpecificGenre = useGetMoviesQuery({genreId: 14})

  console.log("bytitle: ",searchByTitle.data);
  console.log("genres: ",genres.data);
  console.log("topVoted: ", topVoted.data);
  console.log("top voted genre thing: ", topVotedInSpecificGenre.data);

  return (
    <>
    </>
  )
}

export default App
