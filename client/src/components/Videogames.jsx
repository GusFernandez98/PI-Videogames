import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAllVideogames } from "../redux/actions";
import img from '../imagenes/d0898894122ab331c6411faee24cd4bd.jpg'
import CardVideogame from "./CardVideogame";
import s from '../style/Videogames.module.css'
import Loading from './Loading'
import Error from "./Error";

export const Videogames = ({ currentGames }) => {
    const dispatch = useDispatch();
    const [carga, setCarga] = useState(true);
  
    React.useEffect(() => {
      dispatch(getAllVideogames()).then(() => setCarga(false)); //me traigo la action creators q me trae todos mis videojuegos de la API
    }, [dispatch]);
  
    if (carga) {
      return <Loading />;
    }
  
    return (
      <div className={s.main}>
        {currentGames.length > 0 ? (
          currentGames.map(v => {
            // Verificar si genres es un array antes de mapearlo
            const genresList = Array.isArray(v.genres)
              ? v.genres.map(e => (typeof e === 'object' ? e.name : e)).join(', ')
              : 'Genre not available';
  
            return (
              <CardVideogame
                key={v.id}
                id={v.id}
                image={v.image ? v.image : img}
                name={v.name}
                genres={genresList}
                rating={v.rating}
              />
            );
          })
        ) : (
          <Error />
        )}
      </div>
    );
  };