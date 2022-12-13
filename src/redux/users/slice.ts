import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Users, UsersState, Status } from '../../@types/users';



const initialState: UsersState = {
    users: [],
    user: null,
    status: Status.LOADING,
}

export interface UsersBan {
    _id: string;
    ban: boolean;
}


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<Users[]>) => {
            state.users = action.payload
            state.status = Status.SUCCESS
        },
        setUser: (state, action: PayloadAction<Users | null>) => {
            state.user = action.payload
            state.status = Status.SUCCESS
        },
        addUsers: (state, action: PayloadAction<Users>) => {
            state.users = [...state.users, action.payload]
            state.status = Status.SUCCESS
        },
        updateUser: (state, action: PayloadAction<Users>) => {
            state.users = state.users.map(user => user._id === action.payload._id ? action.payload : user)
            state.status = Status.SUCCESS
        },
        banUserInnerSLice: (state, action: PayloadAction<UsersBan>) => {
            state.users = state.users.map(user => user._id === action.payload._id ? {...user, ban: action.payload.ban} : user)
            state.status = Status.SUCCESS
        }
    },

});

export const {
    setUsers,
    setUser,
    updateUser,
    banUserInnerSLice,
    addUsers
} = usersSlice.actions;


export const userData = (state: any) => state.users;

export default usersSlice.reducer;



