
import { Reorder } from 'framer-motion'
import React from 'react'

export interface ReorderWrapProps {
    children: React.ReactNode
    value: any
    className?: string
}

const ReorderWrap: React.FC<ReorderWrapProps> = ({children, value, className}) => {


  return (
    <Reorder.Item className={className} value={value}>
      {children}
    </Reorder.Item>
  )
}

export default ReorderWrap
