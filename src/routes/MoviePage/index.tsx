import { options } from "@config/config";
import { Movie } from "@interfaces/movies";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const MoviePage = () => {
    const { id } = useParams<string>();
    const [data, setData] = useState<Movie>();

    const movieData = async () => {
       try {
        const url = new URL(
            `https://api.themoviedb.org/3/movie/${id}`,
        );
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        return data;
        } catch (error) {
        console.error('Error fetching movie data:', error);
        }
    }

    useEffect(() => {
        movieData()
    }, [])

    console.log()
    return <h1>{data?.title || 'Данные не найдены'}</h1>;
}

export default MoviePage;