import Home from "$pages/Home"
import NoPage from "$pages/NoPage"

import { createBrowserRouter, RouterProvider } from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "*",
    element: <NoPage />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
