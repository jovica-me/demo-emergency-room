import Link from "next/link";
import { ReactNode } from "react";

type NavGroup = {
  name: string;
  items: NavItem[];
};
type NavItem = {
  name: string;
  href: string;
  d: string;
};
const nav: NavGroup[] = [
  {
    name: "Pacijenti",
    items: [
      {
        name: "Pacijenti (pokazi sve)",
        href: "/",
        d: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605",
      },
      {
        name: "Šok sobe",
        href: "/pacijenti",
        d: "",
      },
    ],
  },
];

export enum PesonalType {
  DOCTOR,
  NURSE,
  RECEPTIONIST,
  MANAGER,
  ADMIN,
}

export default function MainLayout({
  children,
  type = PesonalType.RECEPTIONIST,
}: {
  children: ReactNode;
  type?: PesonalType;
}) {
  return (
    <div className="static grid grid-cols-[minmax(200px,320px)_minmax(400px,1fr)] bg-gray-200">
      <div className="sticky top-0 max-h-screen  ">
        <SideBar />
      </div>
      <div className=" flex min-h-screen flex-col">{children}</div>
    </div>
  );
}

function SideBar() {
  return (
    <aside className="flex h-full  ">
      <div className="flex w-16 flex-col items-center py-8 ">
        <nav className="flex flex-1 flex-col items-center space-y-8 ">
          <a
            href="#"
            className="focus:outline-nones inline-block rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </a>

          <a
            href="#"
            className="inline-block rounded-lg  p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </a>

          <a
            href="#"
            className="focus:outline-nones inline-block rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
              />
            </svg>
          </a>

          <a
            href="#"
            className="focus:outline-nones inline-block rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </a>

          <a
            href="#"
            className="focus:outline-nones inline-block rounded-lg p-1.5 text-gray-500 transition-colors duration-200 hover:bg-gray-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </a>
        </nav>

        <div className="mt-4 flex flex-col items-center space-y-4">
          <a href="#">
            <img
              className="h-8 w-8 rounded-lg object-cover"
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80"
              alt="avatar"
            />
          </a>

          <a
            href="#"
            className="rotate-180 text-gray-500 transition-colors duration-200 hover:text-blue-500 rtl:rotate-0 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="w-full overflow-y-auto px-5 py-8  sm:w-64">
        <nav className="-mx-3 space-y-6 ">
          {nav.map((group) => (
            <NavGroup group={group} />
          ))}
        </nav>
      </div>
    </aside>
  );
}

function NavGroup({ group }: { group: NavGroup }) {
  return (
    <div className="space-y-3 ">
      <label className="px-3 text-xs uppercase text-gray-500 ">
        {group.name}
      </label>
      {group.items.map((item) => (
        <NavItem item={item} key={item.href} />
      ))}
    </div>
  );
}

function NavItem({ item }: { item: NavItem }) {
  return (
    <Link
      className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 "
      href={item.href}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d={item.d} />
      </svg>

      <span className="mx-2 text-sm font-medium">{item.name}</span>
    </Link>
  );
}