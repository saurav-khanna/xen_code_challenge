import InvoiceList from "./InvoiceList";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
const fetchInvoices = require('../../utils/fetchInvoices')

jest.mock("../../utils/fetchInvoices");

test('full app rendering/navigating', async () => {
    fetchInvoices.read().mockResolvedValue(() => false)
    render(<InvoiceList />, {wrapper: BrowserRouter})
    const user = userEvent.setup()

    // verify page content for default route
    expect(screen.getByText(/you are home/i)).toBeInTheDocument()

    // verify page content for expected route after navigating
    await user.click(screen.getByText(/about/i))
    expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})