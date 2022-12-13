import MyButton from '../../UI/buttons/MyButton'
import React, {useMemo, useState} from 'react'
import ButtonList from '../ButtonList'
import {getTitleLessThan} from "../../hooks/useTitle";

export interface ArticleAnchorProps {
  anchor: {
    el: any,
    name: string
  }[]
  index?: number
}

const ArticleAnchor: React.FC<ArticleAnchorProps> = ({anchor, index}) => {

  const [indexSubtitle, setIndexSubtitle] = useState(index)

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    setIndexSubtitle(-1)
  }


  const scrollElement = (item, i, e) => {
    e.preventDefault()
    item.el.scrollIntoView({block: 'start', behavior: 'smooth'})
    setIndexSubtitle(i)

  }

  const items = useMemo(() => {
      return anchor && anchor?.map((item, i) => {
        return {
          ...item,
          name: getTitleLessThan(item.name, 10)
        }
      })
  }, [anchor])

  return (
    <div className="article-content__anchor">
      <MyButton setValue={scrollToTop}>Back to top ↑</MyButton>
      {
        items?.length != 0 &&
        <ButtonList index={index} setValue={scrollElement} items={items}/>
      }
    </div>
  )
}

export default ArticleAnchor
