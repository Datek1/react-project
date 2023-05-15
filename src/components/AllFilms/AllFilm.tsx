import React, {FC} from 'react';
import {IMovie} from "../../interfaces";
import css from './allFilm.module.css'
import {useNavigate} from "react-router-dom";

interface IProps{
    results:IMovie
}
const AllFilm:FC<IProps> = ({results}) => {
    const navigate = useNavigate();

    const aboutFilm = () => {
        navigate({
            pathname:'/aboutOfFilm',
            search: `?id=${results.id}`
        })
    }

    return (
    <div className={css.wrapperMovie} onClick={aboutFilm}>
        <div>
            <img src={'https://image.tmdb.org/t/p/original'+`${results.poster_path}`} alt={results.original_title}/>
            <h4>{results.original_title}</h4>
        </div>
    </div>
    );
};

export {AllFilm};