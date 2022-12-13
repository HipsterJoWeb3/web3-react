
import React, {useRef, useEffect, useMemo} from 'react'
import MyButton from '../../UI/buttons/MyButton'
import Copy from '../../assets/iconsComponent/Copy'
import Telegram from '../../assets/iconsComponent/Telegram'
import Reddit from '../../assets/iconsComponent/Reddit'
import Twitter from '../../assets/iconsComponent/Twitter'
import Mail from '../../assets/iconsComponent/Mail'
import Edit from "../../assets/iconsComponent/Edit";
import {userData} from "../../redux/users/slice";
import Tag from "../../assets/iconsComponent/Tag";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export interface ArticleShareProps {
  id: string,
  tags?: any
}


const ArticleShare: React.FC<ArticleShareProps> = ({id, tags}) => {
  const copyRef = useRef<any>()
  const navigate = useNavigate()
  const {user} = useSelector(userData)


  const copyLink = () => {
    // @ts-ignore
    copyRef.current.select()
    // @ts-ignore
    copyRef.current.setSelectionRange(0, 99999)
    // @ts-ignore
    navigator.clipboard.writeText(copyRef.current.value)

  }

  const shareLink = [
    {name: 'on Twitter', Component: Twitter, href: `https://twitter.com/intent/tweet?url=`},
    {name: 'on Telegram', Component: Telegram},
    {name: 'on Reddit', Component: Reddit},
    {name: 'by Mail', Component: Mail},
  ]

  const shareTags = useMemo(() => {
    return tags && tags?.map((tag: any) => {
        return {
            name: tag.value,
            Component: Tag,
            href: `/posts?tags=${tag.value}`
        }
    })
  }, [tags])


  useEffect(() => {
    // @ts-ignore
    copyRef.current.value = window.location.href
  }, [])

  const editPost = () => {
    navigate(`/posts/${id}?type=edit`)
  }

  const checkUser = useMemo(() => {
    return user && user?.roles?.some((role: any) => role?.value === 'ADMIN' || role?.value === 'MODER')
  }, [user])


  return (
    <div className="article-content__share">
      <div>
        <input type="text" ref={copyRef} hidden/>
        <MyButton setValue={copyLink}><Copy /><span>Copy link</span></MyButton>
      </div>

      {
        checkUser &&
        <MyButton setValue={editPost}><Edit /><span>Edit</span></MyButton>
      }


      {
        shareTags?.map(({name, Component, href}: {name: string, Component: any, href: string}) =>
          <MyButton key={name} href={href}><Component /><span>{name}</span></MyButton>
        )
      }
    </div>
  )
}

export default ArticleShare
