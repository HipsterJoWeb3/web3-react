import ButtonList from '../ButtonList'

export interface AdminNavigationProps {
    chapterList: any
    indexNavigation: number
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({chapterList, indexNavigation}) => {


  return (
    <div className="admin-navigation">
      <ButtonList index={indexNavigation} items={chapterList} />
    </div>
  )
}

export default AdminNavigation

