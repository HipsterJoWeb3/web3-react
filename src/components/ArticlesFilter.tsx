import MyButton from '../UI/buttons/MyButton'
import MyInput from '../UI/inputs/MyInput'
import {useNavigate, useLocation} from 'react-router-dom'
import Popular from '../assets/iconsComponent/Popular'
import Recent from '../assets/iconsComponent/Recent'

import searchIcon from '../assets/img/search.svg'
import debounce from 'lodash.debounce'


import {useCallback, useMemo, useState} from "react";

const ArticlesFilter = () => {
  const navigate = useNavigate()
  const {search} = useLocation()

  const getQueryParams = useCallback((param: string) => {
     return new URLSearchParams(search).get(param)
  }, [search])

  const categoryArticle = new URLSearchParams(search).get('type') === 'null' ? 'recent' : new URLSearchParams(search).get('type')



  const sortsLinkByCategory = (type: string) => {
      if(getQueryParams('tags')) return `/posts?type=${type}&tags=${getQueryParams('tags')}`
      if(getQueryParams('author')) return `/posts?type=${type}&author=${getQueryParams('author')}`
      if(getQueryParams('chapter')) return `/posts?type=${type}&chapter=${getQueryParams('chapter')}`
      if(getQueryParams('search')) return `/posts?type=${type}&search=${getQueryParams('search')}`
      return `/posts?type=${type}&chapter=news`
  }

  const sortLink = useMemo(() => {
      return {
            recent: sortsLinkByCategory('recent'),
            popular: sortsLinkByCategory('popular')
      }
  }, [categoryArticle])



  const [value, setValue] = useState('')

    const updateSearchValue = useCallback(
        debounce(str => {
            navigate(`/posts?search=${str}&type=${categoryArticle}`)
        }, 250),
        []
    )

    const onChangeInput = (e: any) => {
        setValue(e.target.value)
        e.target.value.length > 0 && updateSearchValue(e.target.value)
    }

  return (
    <div className="articles-filter d-flex aic jcb">
      <div className="articles-filter__buttons d-flex">
        <MyButton active={categoryArticle === 'popular'} to={sortLink.popular}><Popular /><span>Popular</span></MyButton>
        <MyButton active={categoryArticle === 'recent'}  to={sortLink.recent}><Recent /><span>Recent</span></MyButton>
      </div>
      <div className="articles-filter__input">
        <MyInput placeholder={'Search'} iconUrl={searchIcon} setValue={onChangeInput} value={value}/>
      </div>

    </div>
  )
}

export default ArticlesFilter
