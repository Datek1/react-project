import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {searchActions} from "../../redux";
import {PosterPreview, Loading} from "../../components";
import '../MoviesPage/MoviesPage.css'
import '../../mode.css'

const FindedMoviesPage = () => {
    const {movies, findedMovies, page, name, maxPage, loading} = useAppSelector(state => state.searchFilm)
    const {mode} = useAppSelector(state => state.mode)
    const dispatch = useAppDispatch();

    useEffect(() => {
        movies && movies.map(value => dispatch(searchActions.findMovies(value.id.toString())))
    }, [dispatch, movies, page])

    const inc = () => {
        dispatch(searchActions.inc());
        dispatch(searchActions.searchFilm({name: name, page: page.toString()}))
    }
    const dec = () => {
        dispatch(searchActions.dec())
        dispatch(searchActions.searchFilm({name: name, page: page.toString()}))
    }
    return (
        <>
            {
                loading ? <Loading loading={loading}/> :
                    <div className={`bg ${mode === 2 ? 'bg-dark' : 'bg-light'}`}>
                        <div className={'wrapperAllMovies'}>
                            {
                                findedMovies.map((value) => <PosterPreview results={value} key={value.id}/>)
                            }
                        </div>
                        <div className='pagination'>
                            <button className={`button ${mode === 2 ? '.button-dark' : 'button-light'}`}
                                    disabled={page <= 1} onClick={dec}>Prev Page
                            </button>
                            {
                                <p className={`${mode === 2 ? 'dark' : 'light'}`}>{page}</p>
                            }
                            <button className={` button ${mode === 2 ? '.button-dark' : 'button-light'}`}
                                    disabled={+page === +maxPage} onClick={inc}>Next Page
                            </button>
                        </div>

                    </div>
            }
        </>

    );
};


export {FindedMoviesPage};