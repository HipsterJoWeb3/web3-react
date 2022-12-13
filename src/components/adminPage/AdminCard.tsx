import MyButton from '../../UI/buttons/MyButton'
import MySelect from '../../UI/selects/MySelect'
import {Link} from 'react-router-dom'
import ReorderWrap from './ReorderWrap'
import DragAndDrop from '../../assets/iconsComponent/DragAndDrop'
import React, {useEffect} from 'react'
import {getFormattedDate} from "../../hooks/useDate";
import {useInView} from "react-intersection-observer";
import { motion, useAnimation } from 'framer-motion'
import LazyLoader from "../LazyLoader";

export interface AdminCardProps {
    cardData: {
        _id?: string
        title: string
        link?: string | any
        image?: string
        date?: string
        callback?: (checked: boolean, id: string | number) => void,
        hidden?: boolean
        ban?: boolean
    }
    reorder?: boolean
    setValue?: (e?: React.MouseEvent<HTMLButtonElement>, value?: string, i?: number) => void;
    value?: string,
    actionCard?: string,
    openModal?: (id: string | any) => void,
    focus?: boolean
}

const AdminCard: React.FC<AdminCardProps> = ({focus, openModal, value, cardData, reorder, setValue, actionCard}) => {
    const cardVariants = {
        visible: { opacity: 1, scale: 1, transition: { duration: .1 } },
        hidden: { opacity: 0, scale: 0.85 }
    }


    const [ref, inView] = useInView()

    const controls = useAnimation()

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

  return reorder ? (
    <ReorderWrap value={cardData}>
      <div className={`admin-list__card aic pointer ${!cardData.image ? 'withoutPic' : ''}`}>
        <div className="dragAndDrop">
          <DragAndDrop />
        </div>
        {cardData.image && <div className="admin-list__card-picture" style={{backgroundImage: `url(${cardData.image})`}}></div>}
        <div className={`admin-list__card-content d-flex jcb ${cardData.date ? 'aie' : 'aic'}` }>
          <div className={`admin-list__card-info ${!cardData.date ? 'd-flex' : ''}`}>
            <Link className="admin-list__card-title" to={cardData?.link}><a>{cardData.title.split(' ').slice(0, 5).join(' ')}</a></Link>
            <div className="admin-list__card-date">{cardData?.date}</div>
          </div>


            {

              cardData.callback
              ?

              <div className="gap20 d-flex ">
                <span>{actionCard}</span>
                <MySelect callback={cardData?.callback}/>
              </div>
              :
              <MyButton setValue={setValue} value={value}>view more →</MyButton>

            }

        </div>
      </div>
    </ReorderWrap>
  )
  :
  (
      <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={cardVariants}
      >
    <div className={`admin-list__card ${!cardData.image ? 'withoutPic' : ''}`}>
        {cardData.image && <div className="admin-list__card-picture">
            <LazyLoader
                image={{
                    src: cardData.image,
                    alt: cardData.title
                }}
            />
        </div>}

      <div className={`admin-list__card-content d-flex jcb ${cardData.date ? 'aie' : 'aic'}` }>
        <div className={`admin-list__card-info ${!cardData.date ? 'd-flex' : ''}`}>
            {
                cardData.link
                ?
                <Link className="admin-list__card-title" to={cardData?.link}>{cardData.title.split(' ').slice(0, 5).join(' ')}</Link>
                :
                <div className="admin-list__card-title">{cardData.title.split(' ').slice(0, 5).join(' ')}</div>
            }
            {
                cardData.date &&
                <div className="admin-list__card-date">{getFormattedDate(cardData?.date)} <span>{cardData?.hidden && '[Hidden]'} {cardData?.ban && '[Banned]'}</span></div>

            }
        </div>


          {

            cardData.callback
            ?

            <div className="gap20 d-flex aic">
                <div className="gap20 d-flex aic">
                    <span>{actionCard}</span>
                    <MySelect callback={cardData?.callback} active={!cardData?.hidden} id={cardData._id}/>
                </div>
                {
                    openModal &&
                    <button className="admin-list__card-modal" onClick={() => openModal(cardData._id)}>
                        <DragAndDrop></DragAndDrop>
                    </button>
                }
            </div>
            :
            <MyButton active={focus} setValue={setValue} value={value}>view more →</MyButton>

          }

      </div>
    </div>
      </motion.div>
  )
}

export default AdminCard
