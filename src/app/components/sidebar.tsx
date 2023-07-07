'use client';

import Link from 'next/link';
import WalletIcon from '@mui/icons-material/Wallet';

const menuItems = [
  {
    href: '/',
    title: 'Wallet',
    icon: (iconProps: any) => <WalletIcon {...iconProps} />,
  },
];

export default function Sidebar() {
  return (
    <nav className="w-60 shrink-0">
      <div className="flex flex-col h-full fixed top-0 outline-none left-0 sidebar-container text-white w-60">
        <ul>
          <li className="flex justify-start items-center relative no-underline w-full text-left py-3 px-6 text-xl">
            <Link href="/">NEXT ETH SAT</Link>
          </li>
          <div className="sidebar-menu-container">
            {menuItems.map(({ href, title, icon }) => (
              <li className="flex w-full" key={title}>
                <Link
                  href={href}
                  className="cursor-pointer bg-transparent align-middle text-sidebar-text-color py-0.5 px-6 w-full hover:bg-hovered-sidebar-links"
                >
                  {icon({
                    className: 'mr-4',
                  })}
                  {title}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </nav>
  );
}
