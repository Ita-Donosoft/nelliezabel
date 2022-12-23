import React, { useMemo, useState } from "react";
import ClassNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import handsIconAsset from "../assets/victoria.png";
import CollapsIcon from "./icons/CollapsIcon";
import ArticleIcon from "./icons/ArticleIcon";
import UserIcon from "./icons/UserIcon";
import VideosIcon from "./icons/VideosIcon";
import HomeIcon from "./icons/HomeIcon";
import { User, UserRole } from "../lib/types/user.types";
import { useUser } from "../lib/context/user.context";

type MenuItem = {
  id: number;
  label: string;
  icon: Function
  link: string;
};

const handleMenuItems = (user: User) => {
  switch (user.rol) {
    case UserRole.Aministrador:
      return  [
        { id: 1, label: "Administración de Usuarios", icon: UserIcon, link: "/admin/users" },
        { id: 2, label: "Administración de Noticias", icon: ArticleIcon, link: "/admin/news" },
        { id: 3, label: "Administración de Palabras", icon: HomeIcon, link: "/admin/dictionary" },
      ];
    
    case UserRole.Consultor:
      return  [
        { id: 1, label: "Administración de Noticias", icon: ArticleIcon, link: "/admin/news" },
        { id: 2, label: "Administración de Palabras", icon: HomeIcon, link: "/admin/dictionary" },
      ];

    default:
      return [];
  }
};

const SideNavbar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const user = useUser().user as User;
  const menuItems:MenuItem[] = handleMenuItems(user);
  const { pathname } = useLocation();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = ClassNames(
    "min-h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col shadow-2xl",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = ClassNames(
    "p-4 rounded bg-light-lighter absolute",
    {
      ["left-[16rem]"]: !toggleCollapse,
      "rotate-180": toggleCollapse,
    }
  );
  const logo = ClassNames(
    " w-[3rem] h-[3rem] object-cover rounded-lg p-1 bg-light",
    {
      hidden: toggleCollapse,
    }
  );

  const getNavItemClasses = (menu:any) => {
    return ClassNames(
      "flex items-center bg-light cursor-pointer hover:bg-secondaryHeader rounded w-full overflow-hidden whitespace-nowrap"
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col bg-light ">
        <div className="flex items-center justify-between bg-light relative">
          <div className="flex items-center bg-light pl-1 gap-4">
            <img src={handsIconAsset} className={logo} alt=""/>
            <span
              className={ClassNames(
                "mt-2 text-lg bg-light font-medium text-text-light",
                {
                  hidden: toggleCollapse,
                }
              )}
            >
              Menu
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <Link
                  className="flex py-4 px-3  items-center w-full h-full"
                  to={menu.link}
                >
                <div className="" style={{ width: "2.5rem" }}>
                  <Icon />
                </div>
                  {!toggleCollapse && (
                    <span
                      className={ClassNames(
                        "text-md font-medium text-text-light"
                      )}
                    >
                      {menu.label}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
