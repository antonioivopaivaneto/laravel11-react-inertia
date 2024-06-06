import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import IconLogout from "@/Components/IconLogout";


export default function AuthenticatedLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <nav className="bg-white border-r border-gray-100 w-64 rounded-2xl m-5  ">
        <div className="px-4 py-6 flex-1">
          <div className="flex flex-col items-center">
            <div className="shrink-0 flex items-center mb-6">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
              </Link>
            </div>

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
              <NavLink
                href={route("user.index")}
                active={route().current("user.index")}
              >
                Usuarios
              </NavLink>
              <NavLink
               href={route("profile.edit")}
                active={route().current("profile.edit")}
              >
                Perfil
              </NavLink>
              <NavLink
              className="flex gap-2  ml-0"
              href={route("logout")}
                      method="post"

              >

              <IconLogout  />

                Sair
              </NavLink>
            </div>

          </div>
        </div>
      </nav>

      <div className="flex-1 rounded-lg m-5">
        {header && (
          <header className="bg-white shadow rounded-2xl ">
            <div className=" mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
              {header}
            </div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </div>
  );
}
