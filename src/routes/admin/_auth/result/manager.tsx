import { createFileRoute } from "@tanstack/react-router";
import ResultTable from "../../../../admin/Tables/ResultTable";

export const Route = createFileRoute("/admin/_auth/result/manager")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <div className="mx-auto h-full w-[95%] py-10">
        <div className="mb-10 px-5">
          <h2 className="text-xl font-bold">Result List</h2>
        </div>
        <div>
          <ResultTable />
        </div>
      </div>
    </section>
  );
}
