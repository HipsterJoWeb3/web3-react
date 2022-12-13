import MyButton from '../UI/buttons/MyButton'

import Options from './Options'
import Articles from './Articles'

import React, { useState } from 'react'
import {Post}  from "../@types/posts";

export interface ArticlesWrapProps {
    items: Post[]
    title: string
    iconUrl: any
    reverse?: boolean
    orientationType: 'grid' | 'list',
    url?: string
}

const ArticlesWrap: React.FC<ArticlesWrapProps> = ({url, items, title, iconUrl, orientationType, reverse}) => {


  return (
    <div className="articles-wrap">
      <div className="articles-label d-flex aic jcb">
          <h2>{title}</h2>
        <MyButton to={url}>View more → </MyButton>
      </div>
        <Articles orientation={orientationType} items={items}/>
    </div>
  )
}



export default ArticlesWrap
