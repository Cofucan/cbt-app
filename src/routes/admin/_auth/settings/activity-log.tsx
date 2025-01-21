import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ImportImgs from "../../../../admin/components/ImportImgs";
import ActivityLog from "../../../../admin/Tables/ActivityLogs";

export const Route = createFileRoute("/admin/_auth/settings/activity-log")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const images = ImportImgs();
  return (
    <section className="w-full">
      <div className="flex items-center gap-2 px-14 py-10">
        <img src={images.arrowleft} alt="ArrowLeft" />
        <button
          onClick={() => navigate({ to: "/admin/settings" })}
          className="text-2xl font-bold"
        >
          Activity Logs
        </button>
      </div>
      <div className="mx-auto w-[90%]">
        <ActivityLog />
      </div>
    </section>
  );
}
