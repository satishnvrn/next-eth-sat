import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen p-24">
      <div>ETH Wallet</div>
      <div>
        <button>Connect Wallet</button>
        <input type='number' placeholder='Enter eth to fund' />
        <button>Fund</button>
        <button>Withdraw</button>
      </div>
    </main>
  );
}
