import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'
import React from 'react'

interface IProps {
    currentPage?: number
    onChangePage?: ((page: number) => void) | any
    totalCount?: number | any
}

const Pagination: React.FC<IProps> = ({currentPage, onChangePage, totalCount}) => {
  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={totalCount/15}
        previousLabel="<"

    />
  )
}

export default Pagination
