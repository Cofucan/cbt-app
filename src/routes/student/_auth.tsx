import {createFileRoute, Navigate, Outlet} from '@tanstack/react-router'
import {useContext} from "react";
import AuthContext from "../../student/context/AuthProvider.tsx";

export const Route = createFileRoute('/student/_auth')({
    component: RouteComponent,
})

function RouteComponent() {
    const {auth} = useContext(AuthContext);

    return auth.isAuthenticated ? <Outlet/> : <Navigate to="/student/login"/>;
}
