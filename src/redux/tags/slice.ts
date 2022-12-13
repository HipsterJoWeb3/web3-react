import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Status, Tags, TagsState} from '../../@types/tags';




const initialState: TagsState = {
    tags: [],
    status: Status.LOADING,
}


export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<Tags[]>) => {
            state.tags = action.payload
            state.status = Status.SUCCESS
        }
    },

});


export const tagsData = (state: any) => state.tags;

export const {setTags} = tagsSlice.actions;

export default tagsSlice.reducer;

