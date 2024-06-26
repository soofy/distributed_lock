import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { skipTicket, getTicketsLockedByUser } from '../../redux/entitiesState';

export const TicketsLockedByUser = () => {
  const dispatch = useDispatch();

  let tickets = useSelector((state) => state.entitiesState.lockedByUserTickets);

  const skip = async (e) => {

    await dispatch(skipTicket({ ticketId: e.target.value, locked: false, lockedBy: '' }));
    tickets = [];
    await dispatch(getTicketsLockedByUser());
  }
  return (
    <div className='box'>
      {tickets && tickets.length > 0 ?
        <div>
          <div className='users'>
            <div className='header id'>id</div><div className='header'>status </div>   <div className='header'>locked </div> <div className='header locked'>locked By</div>
          </div>
          {tickets.map((ticket) => {
            return <div className='users'>
              <div className='header id'>  {ticket._id} </div><div className='header'> {ticket.status}</div><div className='header'>{ticket.locked ? 'locked' : 'unlocked'} </div> <div className='lockedBy'>{ticket.lockedBy} </div>  <button class="button  is-link  is-small is-outlined" value={ticket._id} onClick={skip}>Skip Ticket</button> </div>
          })}

        </div >

        : ''}
    </div >
  )
}
