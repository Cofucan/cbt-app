import {createFileRoute, useNavigate} from '@tanstack/react-router'
import AdminTable from "../../../admin/Tables/AdminTable";

export const Route = createFileRoute('/admin/_auth/manager')({
  component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();

    return (
        <section className="full">
          <div className="w-[95%] mx-auto h-full py-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Admins</h2>
              <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate({to: "/admin/manage-role"})}
                    className="px-4 py-2 flex items-center gap-2 text-[#ff6636] bg-[#FFEEE8] font-bold shadow-md focus:outline-none"
                >
                  Manage Roles
                </button>
                <button
                    onClick={() => navigate({to: "/admin/create"})}
                    className="px-4 py-2 flex items-center gap-2 text-white bg-[#ff6636] shadow-md focus:outline-none"
                >
                  Add New Admin
                </button>
              </div>
            </div>
            {/*Table */}
            <div className="mt-20">
              <AdminTable />
            </div>
          </div>
        </section>
    );
  };

