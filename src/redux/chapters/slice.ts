import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Chapter, ChaptersState, Status } from '../../@types/chapters';




const initialState: ChaptersState = {
    chapters: [],
    status: Status.LOADING,
}


export const chaptersSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers: {
        setChapters: (state, action: PayloadAction<Chapter[]>) => {
            state.chapters = action.payload
            state.status = Status.SUCCESS
        }
    }
});

export const { setChapters } = chaptersSlice.actions;

export const chaptersData = (state: any) => state.chapters;

export default chaptersSlice.reducer;

