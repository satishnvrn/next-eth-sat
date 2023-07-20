import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './globals.css';
import { Inter } from 'next/font/google';

import Sidebar from '@/app/components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ETH Wallet',
  description: 'Connects to testnet eth wallets and test smart contracts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <html lang="en">
          <body className={inter.className}>
            <div className="flex min-h-screen">
              <Sidebar>{children}</Sidebar>
            </div>
          </body>
        </html>
  );
}
