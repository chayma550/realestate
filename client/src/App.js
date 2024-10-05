import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Singlepage from "./pages/SinglePage/Singlepage";
import Listpage from "./pages/ListPage/Listpage";
import ProfilePage from "./pages/ProfilPage/ProfilePage";
import NewPostPage from "./pages/NewPostPage/NewPostPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./components/Layout/Layout";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import { listPageLoader,  profileLoader,  SinglePageLoader } from "./components/lib/loaders";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/list",
          element: <Listpage />,
          loader:listPageLoader
        },
        {
          path: "/list/:id",
          element: <Singlepage />,
          loader:SinglePageLoader
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader:profileLoader
        },
        {
          path: "/updateProfile",
          element: <UpdateProfile/>,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;