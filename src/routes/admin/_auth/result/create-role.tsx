import { createFileRoute } from "@tanstack/react-router";
import ImportImgs from "../../../../admin/components/ImportImgs";

export const Route = createFileRoute("/admin/_auth/result/create-role")({
  component: RouteComponent,
});

function RouteComponent() {
  const images = ImportImgs();
  return (
    <section>
      <div className="mx-auto h-full w-[95%] py-10">
        <div className="gap- flex items-center">
          <img src={images.arrowleft} alt="Arrow-left" />
          <h2 className="text-2xl font-semibold">Create New Role</h2>
        </div>
        <div></div>
      </div>
    </section>
  );
}
