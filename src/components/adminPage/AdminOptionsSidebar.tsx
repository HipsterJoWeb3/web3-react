import MyInput from '../../UI/inputs/MyInput'
import MyButton from '../../UI/buttons/MyButton'
import iconSearch from '../../assets/img/search.svg'

import Delete from '../../assets/iconsComponent/Delete'
import Ban from '../../assets/iconsComponent/Ban'

import GroupButtons from '../GroupButtons'

const avatarUrl = 'https://images.unsplash.com/flagged/photo-1562599838-8cc871c241a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'



const AdminOptionsSidebar = () => {

  const groupButton = [...new Array(12)].map((_, i) => {
    return {
      text: `Post# ${i}`,
      to: `/posts/${i}`
    }
  })


  return (
    <div className="admin-sidebar__options">
      <h2>Moderator info</h2>
      <div className="admin-sidebar__options-item d-flex gap20">
        <div className="admin-sidebar__options-item__inner">
          <div className="admin-avatar" style={{backgroundImage: `url(${avatarUrl})`}}></div>
          <span>User 1</span>
        </div>

      </div>
      <div className="admin-sidebar__options-item">
        <h3 className="admin-sidebar__options-label">Was created</h3>

        <div className="admin-sidebar__options-item__inner">
          <p>Jun 22, 2022</p>
        </div>
      </div>
      <div className="admin-sidebar__options-item">
        <h3 className="admin-sidebar__options-label">Posts created and moderated</h3>
        <div className="admin-sidebar__options-item__inner">
          <MyInput placeholder={'Search post'} iconUrl={iconSearch}/>
          <GroupButtons groupButtonData={groupButton} />
        </div>
        
      </div>
      <div className="admin-sidebar__options-item">
        <h3 className="admin-sidebar__options-label">Actions with the moderator</h3>
        <div className="d-flex gap20 admin-sidebar__options-item__inner">
          <MyButton><Delete/><span>Delete</span></MyButton>
          <MyButton><Ban/><span>Banned</span></MyButton>
        </div>
      </div>
    </div>
  )
}

export default AdminOptionsSidebar
