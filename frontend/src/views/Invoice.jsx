import React from 'react'
import { useState } from 'react'
import { Link, useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function Invoice() {
    const { id } = useParams()
    const [dbdata, setData] = useState('');
    React.useEffect(() => {
      async function getData() {
        const response = await fetch('http://localhost:3000/invoices/' + id);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        
        const dbdata = await response.json();
        setData(dbdata);
      }
      getData();
      return;
    },[dbdata]);
    const data = JSON.stringify(dbdata)
    const parsedData = JSON.parse(data)
    let nextStatus = ''
    let buttonText = ''
    switch(parsedData.status) {
      default: // For rejected and closed statuses
          buttonText = ''
          nextStatus = ''
          break;
      case 'created':
          buttonText = 'Approve'
          nextStatus = 'approved'
          break;
      case 'approved':
          buttonText = 'Purchase'
          nextStatus = 'purchased'
          break;
      case 'purchased':
          buttonText = 'Close'
          nextStatus = 'closed'
          break;
    }
    const showRejectButton = parsedData.status === 'created'

    function handleMoveForwardClick() {
      fetch('http://localhost:3000/invoices/' + id, {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          },
          method: "PATCH",	

          body: JSON.stringify({
          status: nextStatus
          })
      })
    }

    function handleRejectClick() {
      fetch('http://localhost:3000/invoices/' + id, {
          headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          },
          method: "PATCH",	

          body: JSON.stringify({
          status: 'rejected'
          })
      })
    }

  return(
      <>
          <Box sx={{ width: '100%' }}>
              <Item>
                  <h1>Invoice {id} Details</h1>
                  <h3>Invoice #: {parsedData.invoice_number}</h3>
                  <h3>Amount: ${parseFloat(parsedData.amount).toFixed(2)}</h3>
                  <h3>Due Date: {parsedData.due_date}</h3>
                  <h3>Status: {parsedData.status}</h3>
                  {buttonText !== '' && (
                      <div>
                      <Button variant="outlined" onClick={handleMoveForwardClick}>{buttonText}</Button>
                      </div>
                  )}
                  {showRejectButton && (
                  <div>
                      <br/>
                      <Button variant="outlined" onClick={handleRejectClick}>Reject</Button>
                  </div>
                  )}
              </Item>
          </Box>
          <br/>
          <Link to='/invoices/'>Return to all invoices</Link>
      </>
  )
}
