import React from 'react'
import Spinner from '../spinner'
import styles from './SpinnerFixedHeight.module.scss'

const SpinnerFixedHeight: React.FC = () => {
  return (
    <div className={styles['spinner-container']}>
      <Spinner />
    </div>
  )
}

export default SpinnerFixedHeight
