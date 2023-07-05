import { Invoice } from './Invoice'
import {render, screen, waitFor} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import React from 'react'
import { enableFetchMocks } from 'jest-fetch-mock'
import '@testing-library/jest-dom'
enableFetchMocks()

describe("Invoice", () => {
  it("should render data with a successful request", async () => {
    fetch.mockResponse(JSON.stringify({ status: 200,id:5,invoice_number:"INV-005",amount:"79823.0",due_date:"2023-07-17",created_at:"2023-07-04T00:49:52.903Z",updated_at:"2023-07-04T00:49:52.903Z",status:"created" }))
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Invoice />, {wrapper: BrowserRouter})
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: "Invoice #: INV-005"})).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: "Amount: $79823.00"})).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: "Due Date: 2023-07-17"})).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: "Status: created"})).toBeInTheDocument()
    })
  });

  it("should render empty data with an unsuccessful request", async () => {
    fetch.mockResponse(JSON.stringify({ }))
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Invoice />, {wrapper: BrowserRouter})
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: "Invoice #:"})).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: "Amount: $NaN"})).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: "Due Date:"})).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: "Status:"})).toBeInTheDocument()
    })
  });

  it("renders the approve and reject buttons for an invoice with created status", async () => {
    fetch.mockResponse(JSON.stringify({ status: 200,id:5,invoice_number:"INV-005",amount:"79823.0",due_date:"2023-07-17",created_at:"2023-07-04T00:49:52.903Z",updated_at:"2023-07-04T00:49:52.903Z",status:"created" }))
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Invoice />, {wrapper: BrowserRouter})
    await waitFor(() => {
      expect(screen.getByRole('button', { name: "Approve"})).toBeInTheDocument()
      expect(screen.getByRole('button', { name: "Reject"})).toBeInTheDocument()
    })
  });

  it("renders the purchase button for an invoice with approved status", async () => {
    fetch.mockResponse(JSON.stringify({ status: 200,id:5,invoice_number:"INV-005",amount:"79823.0",due_date:"2023-07-17",created_at:"2023-07-04T00:49:52.903Z",updated_at:"2023-07-04T00:49:52.903Z",status:"approved" }))
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Invoice />, {wrapper: BrowserRouter})
    await waitFor(() => {
      expect(screen.getByRole('button', { name: "Purchase"})).toBeInTheDocument()
    })
  });

  it("renders the close button for an invoice with purchased status", async () => {
    fetch.mockResponse(JSON.stringify({ status: 200,id:5,invoice_number:"INV-005",amount:"79823.0",due_date:"2023-07-17",created_at:"2023-07-04T00:49:52.903Z",updated_at:"2023-07-04T00:49:52.903Z",status:"purchased" }))
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Invoice />, {wrapper: BrowserRouter})
    await waitFor(() => {
      expect(screen.getByRole('button', { name: "Close"})).toBeInTheDocument()
    })
  });

  it("renders no buttons for an invoice with closed status", async () => {
    fetch.mockResponse(JSON.stringify({ status: 200,id:5,invoice_number:"INV-005",amount:"79823.0",due_date:"2023-07-17",created_at:"2023-07-04T00:49:52.903Z",updated_at:"2023-07-04T00:49:52.903Z",status:"closed" }))
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Invoice />, {wrapper: BrowserRouter})
    await waitFor(() => {
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  });

  it("renders no buttons for an invoice with rejected status", async () => {
    fetch.mockResponse(JSON.stringify({ status: 200,id:5,invoice_number:"INV-005",amount:"79823.0",due_date:"2023-07-17",created_at:"2023-07-04T00:49:52.903Z",updated_at:"2023-07-04T00:49:52.903Z",status:"rejected" }))
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Invoice />, {wrapper: BrowserRouter})
    await waitFor(() => {
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  });
});
