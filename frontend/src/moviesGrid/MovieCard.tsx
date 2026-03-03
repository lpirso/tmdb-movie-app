import type { Movie } from "../store/tmdbApi";

type MovieCardProps = {
    movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
    const {
        genres,
        language,
        description,
        posterUrl,
        releaseYear,
        title,
    } = movie;

    return (
        <article>
            <img alt={`Poster for the movie ${title}`} src={posterUrl} />
            <h2>{title}</h2>
            <h3>{releaseYear}</h3>
            <h4>{language}</h4>
            <p>{description}</p>
            <div>
                {genres.map((genre) => {
                    return <button key={genre.id}>{genre.name}</button>;
                })}
            </div>
        </article>
    );
};
