import Footer from 'features/Footer'
import Home from 'features/Home'
import Nav from 'features/Nav'
import UnitDetails from 'features/UnitDetails/UnitDetails'
import Units from 'features/Units'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'units',
        children: [
          { index: true, element: <Units /> },
          { path: 'new', element: <UnitDetails /> },
        ],
      },
    ],
  },
])

function Root() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return <RouterProvider router={router} />
}

export default App
