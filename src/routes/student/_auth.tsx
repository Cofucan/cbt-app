import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useAuth } from "../../student/context/AuthProvider.tsx";

export const Route = createFileRoute("/student/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { auth } = useAuth();

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/student/login" />;
}
