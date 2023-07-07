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
          <Sidebar />
          <main className="flex flex-1 flex-col">
            <div className="flex flex-col shrink-0 bg-[#009be5] text-white px-6 min-h-12 items-center">
              <div className="flex flex-wrap flex-row -ml-2 header-content items-center py-4">
                <div className="pl-2 pt-2">
                  <h1 className="m-0 font-medium text-2xl">Wallet</h1>
                </div>
              </div>
            </div>
            <div className="flex-1 py-12 px-8 bg-[#eaeff1]">
              <div className="bg-white text-content-color rounded-lg max-w-[936] m-auto py-10 px-4">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
