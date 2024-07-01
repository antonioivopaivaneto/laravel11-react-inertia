import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import IconLogout from "@/Components/IconLogout";

export default function AuthenticatedLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
<div className="min-h-screen bg-gray-100 flex flex-col md:flex-row overflow-hidden" style={{ background: 'linear-gradient(to right, #000, #000)' }}>
<nav className={`bg-[#111] w-full md:w-52 flex flex-col fixed z-10 h-full md:h-screen overflow-y-auto ${showingNavigationDropdown ? 'block' : 'hidden'} md:block`}>
<div className="px-6 py-6 flex-1">
          <div className="flex flex-col items-center">
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <ApplicationLogo className="block h-full w-auto fill-current text-gray-800" />
              </Link>
            </div>
            <div className="mb-10"></div>
            <div className="flex flex-col space-y-6 w-full">
              <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
              >
                Dashboard
              </NavLink>
              <NavLink
                href={route("project.index")}
                active={route().current("project.index")}
              >
                Projetos
              </NavLink>
              <NavLink
                href={route("task.index")}
                active={route().current("task.index")}
              >
                Todas Tarefas
              </NavLink>
              <NavLink
                href={route("task.myTasks")}
                active={route().current("task.myTasks")}
              >
                Minhas tarefas
              </NavLink>
              {user.is_admin && (
                <NavLink
                  href={route("user.index")}
                  active={route().current("user.index")}
                >
                  Usuarios
                </NavLink>
              )}
              <div className="relative bottom-0">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-[#222] hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {user.name}
                        <svg
                          className="ms-2 -me-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>
                  <Dropdown.Content align="left">
                    <Dropdown.Link href={route("profile.edit")}>
                      Perfil
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                    >
                      <div className="flex">
                        Sair <IconLogout />
                      </div>
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="md:hidden flex justify-end p-4">
        <button
          onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-[#222] hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
        >
          Menu
        </button>
      </div>
      <div className="flex-1 rounded-lg ml-0 md:ml-52 p-5">
        {header && (
          <header className="shadow rounded-2xl">
            <div className="py-6 sm:px-4">
              {header}
            </div>
          </header>
        )}
        <main>{children}</main>
      </div>
    </div>
  );
}
