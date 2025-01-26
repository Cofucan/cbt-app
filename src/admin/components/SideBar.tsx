import {
  Link,
  LinkProps,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import ImportImgs from "./ImportImgs";
const images = ImportImgs();

const sidebarItems: {
  label: string;
  activeImage: string;
  inactiveImage: string;
  to: Exclude<LinkProps["to"], undefined>;
}[] = [
  {
    label: "Test Manager",
    to: "/admin/test",
    activeImage: images.CapWhite,
    inactiveImage: images.CapGray,
  },
  {
    label: "New Test",
    to: "/admin/new-test",
    activeImage: images.PlusCircleWhite,
    inactiveImage: images.PlusCircleGray,
  },
  {
    label: "Class Manager",
    to: "/admin/class-manager",
    activeImage: images.ClassManagerWhite,
    inactiveImage: images.ClassManagerGray,
  },
  {
    label: "Course Manager",
    to: "/admin/course-manager",
    activeImage: images.StackWhite,
    inactiveImage: images.Stack,
  },
  {
    label: "Student Manager",
    to: "/admin/student-manager",
    activeImage: images.StudentWhite,
    inactiveImage: images.StudentGray,
  },
  {
    label: "Result Manager",
    to: "/admin/result/manager",
    activeImage: images.ResultWhite,
    inactiveImage: images.ResultGray,
  },
  {
    label: "Admin Manager",
    to: "/admin/manager",
    activeImage: images.AdminWhite,
    inactiveImage: images.AdminGray,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    activeImage: images.SettingWhite,
    inactiveImage: images.SettingGearGray,
  },
  {
    label: "My Account",
    to: "/admin/my-account",
    activeImage: images.KeyWhite,
    inactiveImage: images.KeyGray,
  },
];

const SideBar = () => {
  const router = useRouterState();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") + "";

  const clickHandler = async () => {
    localStorage.setItem("token", "");
    await navigate({ to: "/admin" });
  };

  useEffect(() => {
    if (!token) {
      navigate({ to: "/admin" }).then((_) => _);
    }
  }, [token]);

  return (
    <section className="z-0 h-screen w-[250px] border-r lg:w-[290px]">
      <ul className="flex h-full w-full flex-col max-md:items-stretch">
        {sidebarItems.map(
          ({ label, to, activeImage, inactiveImage }, index) => {
            return (
              <li key={index} className="">
                <Link
                  className={"mt-3 flex gap-2 px-4 py-3 text-sm font-[400]"}
                  activeProps={{
                    className: "text-white bg-[#ff6636]",
                  }}
                  inactiveProps={{
                    className: "text-[#8c94a3] hover:text-[#8c94a3]",
                  }}
                  to={to}
                >
                  <img
                    src={
                      router.location.href === to ? activeImage : inactiveImage
                    }
                    alt={`${label} Icon`}
                    className="size-6"
                  />
                  {label}
                </Link>
              </li>
            );
          },
        )}
        <li
          className="mt-3 flex items-center gap-2 rounded-md px-4 py-3 text-sm font-[400] text-[#8c94a3] hover:text-[#8c94a3]"
          onClick={clickHandler}
        >
          <img src={images.Logout} alt="#" className="size-6" />
          Logout
        </li>
        ,
      </ul>
    </section>
  );
};

export default SideBar;
