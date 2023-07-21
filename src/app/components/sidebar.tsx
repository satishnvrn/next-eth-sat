'use client';

import Link from 'next/link';
import WalletIcon from '@mui/icons-material/Wallet';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { usePathname } from 'next/navigation';
import { NotificationProvider } from '@web3uikit/core';
import { MoralisProvider } from 'react-moralis';
import { ConnectButton } from '@web3uikit/web3';
import { useState } from 'react';

const menuItems = [
  {
    href: '/',
    title: 'Wallet',
    linkText: 'Wallet',
    icon: (iconProps: any) => <WalletIcon {...iconProps} />,
  },
  {
    href: '/lottery',
    title: 'Decentralized Lottery',
    linkText: 'Lottery',
    icon: (iconProps: any) => <AssuredWorkloadIcon {...iconProps} />,
  },
];

const pageTitle: Record<string, string> = {};
menuItems.forEach((menuItem) => {
  pageTitle[menuItem.href] = menuItem.title;
});

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname: string = usePathname();

  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <>
          <nav className="w-60 shrink-0">
            <div className="flex flex-col h-full fixed top-0 outline-none left-0 sidebar-container text-white w-60">
              <ul>
                <li className="flex justify-start items-center relative no-underline w-full text-left py-3 px-6 text-xl">
                  <Link href="/">NEXT ETH SAT</Link>
                </li>
                <div className="sidebar-menu-container">
                  {menuItems.map(({ href, title, icon, linkText }) => (
                    <li className="flex w-full" key={title}>
                      <Link
                        href={href}
                        className="cursor-pointer bg-transparent align-middle text-sidebar-text-color py-2 px-6 w-full hover:bg-hovered-sidebar-links"
                      >
                        {icon({
                          className: 'mr-4',
                        })}
                        {linkText}
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </nav>
          <main className="flex flex-1 flex-col relative">
            <div className="flex flex-col shrink-0 bg-[#009be5] text-white px-6 min-h-12 items-center">
              <div className="flex flex-wrap flex-row -ml-2 header-content items-center py-4">
                <div className="pl-2 pt-2">
                  <h1 className="m-0 font-medium text-2xl">
                    {pageTitle[pathname]}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex-1 py-12 px-8 bg-[#eaeff1]">
              <div className="absolute right-7 top-5">
                <ConnectButton moralisAuth={false}/>
              </div>
              <div className="bg-white text-content-color rounded-lg max-w-[936] m-auto py-10 px-4">
                {children}
              </div>
            </div>
          </main>
        </>
      </NotificationProvider>
    </MoralisProvider>
  );
}
