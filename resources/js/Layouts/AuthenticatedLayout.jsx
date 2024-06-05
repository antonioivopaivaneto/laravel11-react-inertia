import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function AuthenticatedLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <nav className="bg-white border-r border-gray-100 w-64">
        <div className="px-4 py-6">
          <div className="flex flex-col items-center">
            <div className="shrink-0 flex items-center mb-6">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
              </Link>
            </div>

            <div className="flex flex-col space-y-4 w-full">
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
                Projects
              </NavLink>
              <NavLink
                href={route("task.index")}
                active={route().current("task.index")}
              >
                All Tasks
              </NavLink>
              <NavLink
                href={route("user.index")}
                active={route().current("user.index")}
              >
                Users
              </NavLink>
              <NavLink
                href={route("task.myTasks")}
                active={route().current("task.myTasks")}
              >
                My Tasks
              </NavLink>
            </div>

            <div className="mt-auto w-full">
              <div className="mt-6">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md w-full">
                      <button
                        type="button"
                        className="inline-flex items-center justify-between w-full px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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

                  <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>
                      Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                    >
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1">
        {header && (
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}

        <main>{children}</main>
      </div>
    </div>
  );
}
