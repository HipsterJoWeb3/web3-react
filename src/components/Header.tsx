import {Link} from 'react-router-dom';
import {useState, useEffect, useRef, useMemo} from 'react'
import React from 'react'
import {motion} from 'framer-motion'
import MenuPopup from './MenuPopup'
import ButtonList from './ButtonList'
import { logoutLinks, links } from '../router'
import {chaptersData} from "../redux/chapters/slice";
import {generalData} from "../redux/general/slice";
import {userData} from "../redux/users/slice";
import {mobileLinks, routes, tabLinks} from "../hooks/useCustomRoutes";
import {useHandleClick} from "../hooks/useHandleClick";
import {pagesData} from "../redux/pages/slice";
import {useSelector} from "react-redux";




const Header: React.FC = () => {
  const {general} = useSelector(generalData)
  const {chapters} = useSelector(chaptersData)
  const {user} = useSelector(userData)
  const {pages} = useSelector(pagesData)

  const {pathname} = window.location


  const routesData = routes(general, chapters, pages)
  const [menuActive, setMenuActive] = useState(false)
  const menuClass = menuActive ? 'active' : ''
  const menuRef = useRef<any>()




  useEffect(() => {
    // @ts-ignore
    useHandleClick(menuRef, setMenuActive)
  }, [])

  const tabLinksData = tabLinks(user)


  const mobileLinksData = mobileLinks(user, routesData, tabLinksData)


  return (
    <>
      <header>
        <ul className="header__inner">
          {
            routesData && routesData.map(route =>
              <li key={route.link} className={route.link === pathname ? 'current' : undefined}>
                <Link to={route.link}>{route.name}</Link>
              </li>
            )
          }
        </ul>

        <div ref={menuRef} className={`button-menu-popup ${menuClass}`} onClick={() => setMenuActive(!menuActive)}>
          <div className="button-menu-popup__inner" ></div>
          {
            menuActive &&
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1}}
              transition={{ duration: 0.15 }}

            >
              <MenuPopup className={'menu-full__page'}><ButtonList items={user?._id ? links : logoutLinks} color={'white'}/></ MenuPopup>
              <MenuPopup className={'menu-tab__page'}><ButtonList items={tabLinksData} color={'white'}/></ MenuPopup>
              <MenuPopup className={'menu-mobile__page'}><ButtonList items={mobileLinksData.filter(link => link.name !== 'Admin')} color={'white'}/></ MenuPopup>
            </motion.div>
          }


        </div>
      </header>


    </>
  )
}




export default Header
