
import React, { useEffect } from 'react'

import { motion, useAnimation } from 'framer-motion'
// @ts-ignore
import { useInView } from 'react-intersection-observer'
import CardSkeleton from './CardSkeleton'
import {getFormattedDate} from "../hooks/useDate";
import {Post} from "../@types/posts";
import {getTitleLessThan} from "../hooks/useTitle";
import {Link, useNavigate} from "react-router-dom";
import LazyLoader from "./LazyLoader";

export interface CardProps {
    postData: Post
    orientation: string

}

const Card: React.FC<CardProps> = ({postData, orientation}) => {
  const cardVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: .1 } },
    hidden: { opacity: 0, scale: 0.85 }
  }

  const navigate = useNavigate()


  const [ref, inView] = useInView()

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])






  return (
    postData.title
    ?
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={cardVariants}
    >

      <Link to={`/posts/${postData?._id}`} className="card__wrap">
          <div className={`card d-flex fdc ${orientation === 'list' ? 'list' : 'grid'}`}>

            {
                postData?.imageUrl &&
                <div className="card__image">
                  <LazyLoader
                      image={{
                        src: postData?.imageUrl,
                        alt: postData?.title,
                      }}
                  />
                </div>


            }
            <div className={`card-content ${!postData?.imageUrl ? 'without-picture' : ''}`}>
              <div className="card-content__header">{postData.title}</div>
              <div className="card-content__date">{getFormattedDate(postData.createdAt)}</div>
              <p>{getTitleLessThan(postData.description, 24)}</p>
              <div className="card-content__footer aic jcb d-flex">
                <ul className="tags">
                  {
                    postData.tags.map(item =>
                        <li key={item._id}><Link to={`/posts?tags=${item.value}`}>#{item.value}</Link></li>
                    )
                  }

                </ul>
              </div>
            </div>

          </div>
          </Link>

    </motion.div>
    :
    <div className={`card ${orientation === 'list' ? 'list' : 'grid'}`}>
      <CardSkeleton/>
    </div>

  )
}

export default Card
