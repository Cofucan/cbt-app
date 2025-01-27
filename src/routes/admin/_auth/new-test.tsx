import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ImportImgs from "../../../admin/components/ImportImgs";
import AddTestForm from "../../../admin/Pages/NewTestPage/AddTestForm";
import { useDownloadTemplate } from "../../../admin/utils/useDownloadTemplate";

export const Route = createFileRoute("/admin/_auth/new-test")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const images = ImportImgs();
  const downloadMutation = useDownloadTemplate();

  
  return (
    <section className="w-full">
      <div className="mx-auto w-[90%] py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New Test</h2>
          <div className="flex items-center gap-5">
            <button
              onClick={() => downloadMutation.mutate()}
              className="flex items-center gap-5 bg-[#FFEEE8] px-4 py-2 font-bold text-[#ff6636]"
            >
              Download Template
              <img src={images.DownloadDown} alt="DownloadIcon" />
            </button>
            <button
              onClick={() => navigate({ to: "/admin/test" })}
              className="flex items-center gap-2 bg-[#ff6636] px-5 py-2 font-medium text-white shadow-md focus:outline-none"
            >
              Test Manager
            </button>
          </div>
        </div>
        <div className="mt-5">
          <AddTestForm />
        </div>
      </div>
    </section>
  );
}
