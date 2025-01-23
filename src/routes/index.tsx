import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-[70%] h-[50vh] justify-center flex-col">
      <h1 className="text-2xl font-bold text-center">Welcome to the Esut Portal</h1>
      <button
        className="mt-6 bg-[#ff6636] py-3 font-semibold text-white rounded"
        onClick={() => navigate({ to: "/admin" })} 
      >
        Click Here As An Admin
      </button>
      <button
        className="mt-6 bg-[#ff6636] py-3 font-semibold text-white rounded"
        onClick={() => navigate({ to: "/student" })}
      >
        Click Here As A Student
      </button>
    </div>
  );
}
