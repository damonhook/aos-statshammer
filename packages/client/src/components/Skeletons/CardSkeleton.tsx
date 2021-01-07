import { Skeleton } from '@material-ui/lab'
import React from 'react'

interface CardSkeletonProps {
  height?: number
}

const CardSkeleton = ({ height = 250 }: CardSkeletonProps) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Skeleton variant="rect" height={48} style={{ marginBottom: 10 }}></Skeleton>
      <Skeleton variant="rect" height={height}></Skeleton>
    </div>
  )
}

export default CardSkeleton
