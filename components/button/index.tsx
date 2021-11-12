import React, { ReactNode } from 'react'
import styles from './Button.module.scss'

interface IProps {
  children: ReactNode
  className?: string
  disabled?: boolean
  onClick: () => void
}

export default function Button(props: IProps) {
  const { children, onClick, className, disabled = false } = props
  return (
    <button
      className={`${styles['button']} ${styles[className!]}`}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  )
}
