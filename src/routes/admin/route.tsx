import {createFileRoute, Outlet} from '@tanstack/react-router'
import {store} from "../../admin/app/store.ts";
import {Provider} from "react-redux";
import '../../admin/index.css'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Provider store={store}>
      <Outlet />
    </Provider>
}
