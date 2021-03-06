import React, { useState } from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/images/logo.png'
import Query from '../query'
import { MovieType } from '../../enums/MovieType'
import { useRouter } from 'next/router'
import { Drawer, Button } from 'antd'

const isRunningOnServer = typeof window === 'undefined'

const menuLinks = [
  { key: 'Movies', link: `/search?type=${MovieType.Movie}` },
  { key: 'TV Series', link: `/search?type=${MovieType.TvSeries}` },
]

interface IProps {
  setQueryInput: (query: string) => void
}

export default function Header(props: IProps) {
  const router = useRouter()
  const { setQueryInput } = props
  const [showDrawer, setShowDrawer] = useState(false)

  const getPathnameWithSearch = () => {
    if (!isRunningOnServer) {
      return window?.location.pathname + window?.location.search
    }
    return ''
  }

  const renderLinksDesktop = () => {
    return (
      <ul className={styles.links}>
        {menuLinks.map(link => {
          return (
            <li key={link.key}>
              <Link href={link.link}>
                <a
                  className={
                    getPathnameWithSearch() === link.link
                      ? styles['active-link']
                      : ''
                  }>
                  {link.key}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  const onClickMobileLink = (link: string) => {
    setShowDrawer(false)
    router.push(link, link)
  }

  const renderLinksDrawer = () => {
    const menuLinksWithHome = [{ key: 'Home', link: '/' }, ...menuLinks]

    return (
      <ul className={styles['links-mobile']}>
        {menuLinksWithHome.map(link => {
          return (
            <li
              key={link.key}
              className={styles['link-mobile']}
              onClick={() => onClickMobileLink(link.link)}>
              <p
                className={
                  getPathnameWithSearch() === link.link
                    ? styles['active-link']
                    : ''
                }>
                {link.key}
              </p>
            </li>
          )
        })}
      </ul>
    )
  }

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
        <div className={styles['links-container']}>{renderLinksDesktop()}</div>
        <span className={styles.query}>
          <Query setQueryInput={setQueryInput} />
        </span>
        <Button
          className={styles['drawer-button']}
          onClick={() => setShowDrawer(!showDrawer)}>
          <span className={styles['drawer-button-content']} />
        </Button>
      </div>
      <Drawer
        title='Menu'
        placement='right'
        onClose={() => setShowDrawer(false)}
        className={styles['drawer']}
        visible={showDrawer}>
        {renderLinksDrawer()}
      </Drawer>
    </div>
  )
}
