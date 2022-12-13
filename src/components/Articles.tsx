import Card from './Card'
import React, { useMemo } from 'react'
import CardSkeleton from "./CardSkeleton";


export interface ArticlesProps {
    items: any[]
    orientation: 'grid' | 'list'
}

const Articles: React.FC<ArticlesProps> = ({orientation, items}) => {
  const list = orientation === 'list'


  const dividedByThree = useMemo(() => {
    return [
      items.filter((_, i)=>i % 3 == 0),
      items.filter((_, i)=>i % 3 == 1),
      items.filter((_, i)=>i % 3 == 2)
    ]
  }, [items])


  const dividedByTwo = useMemo(() => {
    return [
      items.filter((_, i)=>i % 2 == 0),
      items.filter((_, i)=>i % 2 != 0)
    ]
  }, [items])





  return (
    <div className={`articles-content ${list ? 'list' : ''}`}>
    {
      list
      ?
      <div className="articles-content__column">
        {
          items && items.map(article =>
            <Card orientation={orientation} key={article._id} postData={article}/>
          )
        }
      </div>
      :
      <>
      {
        dividedByThree && dividedByThree.map((articles, i) =>
          <div className="articles-content__column full-page" key={i}>
            {
              articles.map(article =>
                  <Card orientation={orientation} key={article._id} postData={article}/>

              )
            }
          </div>
        )


      }

      {
        dividedByTwo && dividedByTwo.map((articles, i) =>
          <div className="articles-content__column mobile-page" key={i}>
            {
              articles.map(article =>
                  (
                      article._id
                      ?
                      <Card orientation={orientation} key={article._id} postData={article}/>
                      :
                      <CardSkeleton></CardSkeleton>
                  )
              )
            }
          </div>
        )
      }

      </>

    }
    </div>
  )
}

export default Articles
