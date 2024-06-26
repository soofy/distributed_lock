import React from 'react'
import { useSelector } from 'react-redux';

export const TicketsByUser = () => {

  const tickets = useSelector((state) => state.entitiesState.handledByUserTickets);

  return (
    <div className='box'>
      {tickets && tickets.length > 0 ?
        <div>
          <div className='users'>
            <div className='header id'>id</div><div className='header'>status </div> <div className='header'>Handled By</div>
          </div>
          {tickets.map((ticket) => {
            return <div className='users'>
              <div className='header id'>  {ticket._id} </div><div className='header'> {ticket.status}</div>   <div className='lockedBy'>{ticket.handledBy} </div>  </div>
          })}

        </div >

        : ''}
    </div >
  )
}
