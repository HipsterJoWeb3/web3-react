import AppRouter from "./components/AppRouter";
import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchPosts} from "./asyncActions/posts";
import {checkUser, fetchUsers} from "./asyncActions/users";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {fetchGeneral} from "./asyncActions/general";
import {getChapters} from "./asyncActions/chapters";
import {fetchPages} from "./asyncActions/pages";
import {fetchTags} from "./asyncActions/tags";
import {setPosts} from "./redux/posts/slice";
import {setUser, setUsers} from "./redux/users/slice";
import {setGeneral} from "./redux/general/slice";
import {setChapters} from "./redux/chapters/slice";
import {setPages} from "./redux/pages/slice";
import {setTags} from "./redux/tags/slice";
import Loading from "./components/Loading";


function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const uploadData = useCallback(async () => {

      const general = await fetchGeneral()
      const chapters = await getChapters()
      const pages = await fetchPages()
      const user = await checkUser()
      await dispatch(setGeneral(general))
      await dispatch(setChapters(chapters))
      await dispatch(setPages(pages))
      await dispatch(setUser(user))

      const posts = await fetchPosts({limit: '100'})
      const users = await fetchUsers()
      const tags = await fetchTags(50)

      await dispatch(setPosts(posts))
      await dispatch(setUsers(users))
      await dispatch(setTags(tags))

      setLoading(false)
  }, [])

  useEffect(() => {
      uploadData()
  }, [])

  return (
    <div className="App">
        <BrowserRouter>
            {
                loading
                ?
                <Loading message="Loading content"/>
                :
                <div className="container">
                    <Header />
                    <AppRouter />
                    <Footer />
                </div>
            }

        </BrowserRouter>
    </div>
  )
}

export default App
