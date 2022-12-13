import MyInput from '../../../UI/inputs/MyInput'
import iconSearch from '../../../assets/img/search.svg'

import AdminCard from '../AdminCard'
import ModeratorsSidebar from '../sidebars/ModeratorsSidebar'

import {userData} from "../../../redux/users/slice";
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {Users} from "../../../@types/users";



const AdminModerators = () => {
  const {users} = useSelector(userData)
  const [searchModer, setSearchModer] = useState('')
  const [currentUserId, setCurrentUserId] = useState(null)


  const updatedModer = useMemo(() => {
      if(users.length > 0) {
          let filterModer = users?.map((user: Users) => {
              return {
                  ...user,
                  roles: user.roles.map(role => role.value),
                  title: user.username,
                  link: `/posts?author=${user.username}`,
                  image: user.imageUrl,
                  date: user.createdAt,
              }
          }).filter((user: any) => user.roles.includes('MODER'))

          if (searchModer.length > 3) {
              filterModer = filterModer.filter((user: Users) => user.username.toLowerCase().includes(searchModer.toLowerCase()))
          }

          return filterModer
      }
  }, [users, searchModer])

  useEffect(() => {
        setCurrentUserId(users?.filter((user: Users) => user.roles.map(role => role.value).includes('MODER'))[0]?._id)
  }, [users])


    const changeCurrentUserId = (e: any, value: any, _: any) => {
        setCurrentUserId(value)
    }


    const searchModerator = (e: any) => {
      setSearchModer(e.target.value)
    }



  return (

    <div className="admin-content__wrap mobile-reverse">
      <div className="admin-content middle">
        <h1 className="label">Moderators</h1>
        <div className="admin-list__wrap">
          <div className="admin-list__header d-flex jcb aic">
            <div className="admin-list__count">Count: <span>{updatedModer?.length}</span></div>
            <MyInput placeholder={'Search moderator'} iconUrl={iconSearch} value={searchModer} setValue={searchModerator}/>
          </div>
            <div className="admin-list">
                {
                    users.length && updatedModer.map((item: any) =>
                        <AdminCard key={item.title} cardData={item} setValue={changeCurrentUserId} value={item._id}/>
                    )
                }
            </div>
        </div>
      </div>
      <ModeratorsSidebar userId={currentUserId} />
    </div>
  )
}

export default AdminModerators
