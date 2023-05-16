import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IAboutMovie, IGenre} from "../../interfaces";
import {movieService} from "../../services";


interface IState {
    movie:IAboutMovie<IGenre[]>[]
}
const initialState:IState ={
    movie:[]
}


const slice = createSlice({
    name:'aboutOfFilmSlice',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder
            .addCase(getMovieAsync.fulfilled, (state, action) => {
                state.movie.splice(0,1,action.payload)
            })
    }
})

const getMovieAsync = createAsyncThunk<IAboutMovie<IGenre[]>, string>(
    'movieSlice/getAllMovies',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await movieService.aboutOfFilmById(id)
            return data
        } catch (e) {
            return rejectWithValue('Сервер не відповідає');
        }
    }
)

const {reducer:aboutOfFilmReducer,actions} = slice

const aboutOfFilmActions= {...actions,getMovieAsync}
export {aboutOfFilmActions,aboutOfFilmReducer}