import React from 'react'
import { useSelector } from 'react-redux';

export const Tickets = () => {

  const tickets = useSelector((state) => state.entitiesState.allTickets);

  return (
    <div className='box'>
      {tickets && tickets.length > 0 ?
        <div>
          <div className='users'>
            <div className='header'>id</div><div className='header'>status </div><div className='header'>locked </div> <div className='header locked'>locked By</div> <div className='header'>Handled By</div>
          </div>
          {tickets.map((ticket) => {
            return <div className='users'>
              <div className='header'>  {ticket._id} </div><div className='header'> {ticket.status}</div><div className='header'>{ticket.locked ? 'locked' : 'unlocked'} </div> <div className='lockedBy'>{ticket.lockedBy} </div> <div className='lockedBy'>{ticket.handledBy} </div>  </div>
          })}

        </div >

        : ''}
    </div >
  )
}
