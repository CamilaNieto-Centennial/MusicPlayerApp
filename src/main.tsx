import React from "react";
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider className="dark text-foreground font-poppins bg-zinc-950">
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
