import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Navbar from "../../admin/components/Navbar.tsx";
import SideBar from "../../admin/components/SideBar.tsx";
import Footer from "../../admin/components/Footer.tsx";
import { useMediaQuery } from "react-responsive";

export const Route = createFileRoute("/admin/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setOpenDrawer] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });

  // Handle drawer state based on screen size
  useEffect(() => {
    setOpenDrawer(!isTabletOrMobile);
  }, [isTabletOrMobile]);

  // Show toast notifications for error or success

  // Redirect if user is not logged in
  // if (!token) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      <div className="relative z-10 w-full">
        <Navbar />
      </div>
      <div className="h-full w-full">
        <div className="flex h-full w-full">
          <div className="h-full w-fit bg-[#1D2026]">
            <SideBar />
          </div>
          <div className="h-full w-full overflow-y-auto overflow-x-hidden">
            <div className="h-auto w-full">
              <Outlet />
            </div>
            <div className="pt-20">
              <Footer />
            </div>
            <div className="h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
