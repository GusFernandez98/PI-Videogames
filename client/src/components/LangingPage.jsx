import React from "react";
import { Link } from 'react-router-dom'
import s from '../style/LandingPage.module.css'
// import linkedin from '../imagenes/linkedin (1).png'
// import github from '../imagenes/github (1).png'
// import gmail from '../imagenes/gmail (1).png'

const LandingPage = () => {
    return (
        <div className={s.full}>
            <div className={s.full_inner}>
                <div className={s.content}>
                    <h1 className={s.titulo}>Videogames</h1>
                    <Link to='/home'>
                        <button className={s.btn}>
                            go!
                        </button>
                    </Link>
                </div>    
            </div>
        </div>
        
    )

}

export default LandingPage