import { Container } from '@mui/material'

import './App.css'

import InvoiceList from './views/InvoiceList'
import { Invoice } from './views/Invoice'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/invoices/" element={<InvoiceList />} />
          <Route path="/invoices/:id" element={<Invoice />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
