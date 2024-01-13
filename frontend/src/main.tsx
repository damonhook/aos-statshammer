import "@mantine/core/styles.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import router from "./router"
import { MantineProvider } from "@mantine/core"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <MantineProvider theme={{primaryColor: 'teal'}} defaultColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>
  </React.StrictMode>,
)
