import { StrictMode } from 'react'

import './index.css'
import TesloShopApp from './TesloShopApp'
import { createRoot } from 'react-dom/client';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TesloShopApp />
  </StrictMode>,
)
