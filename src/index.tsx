import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initializeApp } from "firebase/app";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateOders } from "./shared/helpers/utils";
import Landing from "./routes/landing/Landing.page";
import People from "./routes/people/People.page";
import Projects from "./routes/projects/Projects.page";
import News from "./routes/news/News.page";
import Books from "./routes/publications/Publications.page";
import Affiliations from "./routes/affiliations/Affiliations.page";
import Podcasts from "./routes/podcasts/Podcasts.page";
import Admin from "./routes/admin/Admin";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "neuroexed-acccess.firebaseapp.com",
  projectId: "neuroexed-acccess",
  storageBucket: "neuroexed-acccess.appspot.com",
  messagingSenderId: "61939101559",
  appId: "1:61939101559:web:77e099fcb3626e5c897b72",
  measurementId: "G-H9J772QNJX",
};

initializeApp(firebaseConfig);

updateOders();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/people",
    element: <People />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/publications",
    element: <Books />,
  },
  {
    path: "/affiliations",
    element: <Affiliations />,
  },
  {
    path: "/podcasts",
    element: <Podcasts />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        newestOnTop
        autoClose={3000}
        toastClassName="text-onBackground rounded-lg"
        closeButton={true}
      />
    </QueryClientProvider>
  </React.StrictMode>,
);
