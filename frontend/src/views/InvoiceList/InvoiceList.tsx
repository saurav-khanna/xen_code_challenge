import { Suspense, useState } from 'react'
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { Invoice } from '../../types/Invoice.type'
import { fetchInvoices } from '../../utils/fetchInvoices'
import { Link } from 'react-router-dom'

const initialRows = fetchInvoices()
console.log(initialRows)

const InvoiceList = () => {
  const [rows, _setRows] = useState<Invoice[]>(initialRows.read())
  console.log(rows)

  return (
    <Suspense fallback={<CircularProgress />}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 480 }} aria-label="invoices">
          <TableHead>
            <TableRow>
              <TableCell align="left">Invoice ID</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.invoice_number}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                component={Link} to={`/invoices/${row.id}/`}
              >
                <TableCell align="left">{row.invoice_number}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.due_date}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Suspense>
  )
}

export default InvoiceList
