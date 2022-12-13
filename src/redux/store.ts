
import chapters from './chapters/slice';
import users from './users/slice';
import posts from './posts/slice';
import general from './general/slice';
import tags from './tags/slice';
import pages from './pages/slice';




import { configureStore } from '@reduxjs/toolkit'



const store = configureStore({
    reducer: {
        posts,
        users,
        chapters,
        general,
        tags,
        pages
    }
})


export default store


