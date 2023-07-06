import Link from "next/link";

const menuItems = [
  {
    href: '/',
    title: 'Wallet'
  }
];

export default function Sidebar() {
  return (
    <div className="bg-zinc-900 w-60">
      <nav>
        <ul>
          {menuItems.map(({ href, title }) => (
            <li className="m-2" key={title}>
              <Link href={href}>
                <div className="flex p-2 bg-zinc-200 rounded hover:bg-zinc-400 cursor-pointer">{title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}