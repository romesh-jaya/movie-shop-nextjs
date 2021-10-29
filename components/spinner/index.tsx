import React from 'react'
import styles from './Spinner.module.scss'

const Spinner: React.FC = () => {
  return (
    <>
      <div className={styles['spinner-body']}>
        <div className={styles['loading-spinner']} />
      </div>
    </>
  )
}

export default Spinner
