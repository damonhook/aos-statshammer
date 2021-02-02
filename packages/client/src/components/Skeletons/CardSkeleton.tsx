import { Skeleton } from '@material-ui/lab'
import React from 'react'

interface CardSkeletonProps {
  height?: number
}

const CardSkeleton = ({ height = 250 }: CardSkeletonProps) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Skeleton variant="rect" height={32} style={{ marginBottom: 10 }} />
      <Skeleton variant="rect" height={height} />
    </div>
  )
}

export default CardSkeleton
