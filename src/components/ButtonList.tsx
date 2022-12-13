import {Link} from 'react-router-dom';
import React from 'react'
import {Links} from "../router";

import {setUser} from "../redux/users/slice";
import {useDestroyCookie} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toastSuccess} from "../hooks/useModalAndAlert";


interface IProps {
  items: Links[],
  color?: string,
  setValue?: (item: [], i: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  index?: number
}

export type callback = (item: any, i: number, e: any) => void

const ButtonList: React.FunctionComponent<IProps> = ({items, color, setValue, index}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const callback: callback = (item, i, e) => {
    if(setValue)  {
      setValue(item, i, e)
    }
  }

  const logoutUser = () => {
    dispatch(setUser(null))
    useDestroyCookie('token')
    toastSuccess(`You have successfully logged out of your account.`)

    navigate('/')
  }


  return (
    <>
      <ul className="buttonList">
        {
            items && items.map((item, i) =>
                <li key={i}>
                  {
                    item.link
                        ? <Link to={item.link} onClick={e => callback(item, i, e)} className={i === index ? 'active' : ''} style={{color: color}} >{item.name}</Link>
                        : <button style={{color}}  className={i === index ? 'active' : ''} onClick={e => item?.actionCallback === 'logout' ? logoutUser() : callback(item, i, e)}>{item.name}</button>
                  }

                </li>
            )
        }
      </ul>
    </>
  )
}

export default ButtonList
