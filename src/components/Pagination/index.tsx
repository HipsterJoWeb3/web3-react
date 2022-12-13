import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'
import React from 'react'

interface IProps {
    currentPage?: number
    onChangePage?: (page: number) => void
    totalCount?: number
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
        renderOnZeroPageCount={null}

    />
  )
}

export default Pagination
