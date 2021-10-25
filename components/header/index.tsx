import React from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/images/logo.png'
import Query from '../query'
// import { Drawer, Button } from 'antd'

export default function Header() {
  // const [showDrawer, setShowDrawer] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles['inner-container']}>
        <Link href={'/'} passHref>
          <div className={styles.logo}>
            <Image
              src={logo}
              alt='Ultra logo'
              priority
              width='165px'
              height='72px'
              unoptimized
            />
          </div>
        </Link>
        <span className={styles.query}>
          <Query />
        </span>
      </div>
    </div>
  )
}
