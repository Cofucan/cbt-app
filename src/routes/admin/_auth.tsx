import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../../admin/components/Navbar.tsx";
import SideBar from "../../admin/components/SideBar.tsx";
import Footer from "../../admin/components/Footer.tsx";

export const Route = createFileRoute("/admin/_auth")({
  component: RouteComponent,
});

function RouteComponent() {

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
