import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { routeTree } from "./routeTree.gen";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { getSchoolConfig } from "./student/api/auth"; // Import your API function

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
const queryClient = new QueryClient();

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
        <ToastContainer aria-label="Toast" />
      </QueryClientProvider>
    </StrictMode>,
  );
}


const fetchAndSetTitle = async () => {
  try {
    const data = await getSchoolConfig();
    const title = data?.name || "SchoolEdge";
    document.title = title;
  } catch (error) {
    console.error("Error fetching title data:", error);
  }
};

fetchAndSetTitle();
