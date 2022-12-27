import React from 'react'
import type { ReactElement } from 'react'
import { Menu } from 'react-feather'
import Link from 'next/link'
import Head from 'next/head'

type LayoutProps = {
  children: ReactElement
  title: string
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Key Manage Project' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='header sticky top-0'>
        <nav className='nav text-lg'>
          <div className='flex justify-end pt-5 pr-5'>
            <Link href={'/settings/profile'}>
              <Menu size={'40px'} className='cursor-pointer hover:text-gray-500' />
            </Link>
          </div>
        </nav>
      </header>

      {children}
    </>
  )
}
