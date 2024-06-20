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
    <div className="min-h-screen bg-gray-100 flex"  style={{ background: 'linear-gradient(to right, #000, #000)' }}>
      <nav className="bg-[#111] 0 w-64   ">
        <div className="px-4 py-6 flex-1">
          <div className="flex flex-col items-center">
            <div className="shrink-0 flex items-center ">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
              </Link>
            </div>
            <div className="mb-10">
            <small className="text-white mr-2">ProTask</small>

            </div>

            <div className="flex flex-col space-y-6 w-full  ">
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

              <NavLink
               href={route("profile.edit")}
                active={route().current("profile.edit")}
              >
                Perfil
              </NavLink>
              <NavLink
              className="flex gap-2 text-gray-300   "
              href={route("logout")}
                      method="post"

              >


                Sair

                <IconLogout  />

              </NavLink>
            </div>

          </div>
        </div>
      </nav>

      <div className="flex-1 rounded-lg m-10">
        {header && (
          <header className=" shadow rounded-2xl ">
            <div className=" py-6  sm:px-4  ">
              {header}
            </div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </div>
  );
}
