import React from "react";
import s from '../style/CardVideogame.module.css'
import { NavLink } from "react-router-dom";

const CardVideogame = (props) => {
    return (
      <div className={s.card}>
        <img src={props.image} width="400px" height="250px" alt="" />
        <div className={s.card__content}>
          <h3 className={s.nombre}>{props.name}</h3>
          <p className={s.genres}>{props.genres}</p>
          <p className={s.rating}>⭐ {props.rating}</p>
          <NavLink to={`/detail/${props.id}`} className={s.navLink}>
            <span className={s.leer_mas}>Leer más</span>
          </NavLink>
        </div>
      </div>
    );
  };
  
  export default CardVideogame;