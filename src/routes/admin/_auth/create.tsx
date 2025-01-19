import {createFileRoute, useNavigate} from '@tanstack/react-router'
import AddAdminForm from "../../../admin/Pages/AdminManager/AddAdminForm";
import ImportImgs from "../../../admin/components/ImportImgs";

export const Route = createFileRoute('/admin/_auth/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const images = ImportImgs();

  const navigate = useNavigate()

  return (
      <section>
        <div className="w-[95%] mx-auto">
          <div className="flex items-center gap-2 py-10">
            <div onClick={() => navigate({to: "/admin/manager"})} role="button"  >
              <img src={images.arrowleft} alt="arrow" />
            </div>
            <h2 className="font-bold text-2xl">Add Admin</h2>
          </div>
          <div>
            <AddAdminForm />
          </div>
        </div>
      </section>
  );}
