import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "http://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts ={
        height :"390",
        width : "100%",
        playerVars:{
    
          autoplay:1,
        },
      };

      const handleClick = (movie) => {
        console.log(movie.name);
        // console.log(url);        
        if(trailerUrl)
        {
          setTrailerUrl('');
        }else{
       
          movieTrailer(movie?.name || "Hulk")
          .then((url) =>{
            console.log(movie.name);
            console.log(url);
            const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerUrl(urlParams.get("v"))
            
        //    setTrailerUrl("https://www.youtube.com/watch?v=XtMThy8QKqU&t=8602s")
          })
          .catch((error) => console.log(error));
        }
      }
    
    // console.table(movies);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    <img 
                        key={movie.id}
                        onClick={()=> handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarger"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}                       
                        alt={movie.name}
                    />
                ))}
                { trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/> }  
            </div>
        </div>
    );
}

export default Row;