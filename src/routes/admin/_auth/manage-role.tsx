import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ImportImgs from "../../../admin/components/ImportImgs";
import RolePermissions from "../../../admin/Pages/AdminManager/RolePermissions";

export const Route = createFileRoute("/admin/_auth/manage-role")({
  component: RouteComponent,
});

function RouteComponent() {
  const images = ImportImgs();
  const navigate = useNavigate();
  return (
    <section>
      <div className="mx-auto h-full w-[95%] py-10">
        <div className="flex items-center justify-between">
          <div className="flex cursor-pointer items-center gap-2">
            <img src={images.arrowleft} alt="Arrow" />
            <h2 className="text-xl font-bold">Manage Roles</h2>
          </div>
          <div className="button">
            <button
              onClick={() => navigate({ to: "/admin/result/create-role" })}
              className="flex items-center gap-2 bg-[#ff6636] px-4 py-2 text-white shadow-md focus:outline-none"
            >
              Create New Role
            </button>
          </div>
        </div>

        {/*Role Permission section */}
        <div className="mt-10">
          <RolePermissions />
        </div>
      </div>
    </section>
  );
}
