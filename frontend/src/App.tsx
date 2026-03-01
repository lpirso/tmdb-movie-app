import './App.css';
import { useGetMovieByNameQuery } from './services/tmdb';

function App() {

  const { data, error, isLoading } = useGetMovieByNameQuery('lord');

  console.log(data, error, isLoading);

  return (
    <>
    </>
  )
}

export default App
