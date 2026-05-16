import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./font.css"
import App from "./App.tsx"
import { BrowserRouter } from "react-router"
import { HeroUIProvider } from "@heroui/system"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>,
)
