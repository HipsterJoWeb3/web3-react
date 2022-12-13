

const AdminSimpleOption = ({titleOption, text}) => {
  return (
    <div className="admin-sidebar__options-item">
      <h3 className="admin-sidebar__options-label">{titleOption}</h3>

      <div className="admin-sidebar__options-item__inner">
        <p>{text}</p>
      </div>
    </div>
  )
}

export default AdminSimpleOption
