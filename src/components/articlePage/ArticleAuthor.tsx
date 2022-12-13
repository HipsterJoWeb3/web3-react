import {Link} from 'react-router-dom'
import React from "react";

export interface ArticleAuthorProps {
    author: any,
    date: string
}

const ArticleAuthor: React.FC<ArticleAuthorProps> = ({author, date}) => {


  return (
    <div className="article-content__author d-flex jcb aic">
      <div className="author">
        <div className="author-avatar" style={{backgroundImage: `url(${author?.imageUrl})`}}></div>
        <span>by <Link to={`/posts?author=${author?.username}`}>@{author?.username}</Link></span>
      </div>
      <div className="date">{date}</div>
    </div>
  )
}

export default ArticleAuthor
