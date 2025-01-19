import {createFileRoute, useNavigate} from '@tanstack/react-router'
import ImportImgs from "../../../admin/components/ImportImgs";
import RolePermissions from "../../../admin/Pages/AdminManager/RolePermissions";

export const Route = createFileRoute('/admin/_auth/manage-role')({
  component: RouteComponent,
})

function RouteComponent() {
    const images = ImportImgs();
    const navigate = useNavigate();
    return (
        <section>
          <div className="w-[95%] mx-auto h-full py-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={images.arrowleft} alt="Arrow" />
                <h2 className="text-xl font-bold">Manage Roles</h2>
              </div>
              <div className="button">
                <button onClick={() => navigate({to: "/admin/result/create-role"})} className="px-4 py-2 flex items-center gap-2 text-white bg-[#ff6636] shadow-md focus:outline-none">
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
