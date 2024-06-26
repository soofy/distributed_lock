import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleTicket, skipTicket } from '../../redux/entitiesState';

export const EditTicket = (props) => {
  const dispatch = useDispatch();
  const availableTicket = useSelector((state) => state.entitiesState.availableTicket);

  const editTicket = async () => {

    dispatch(handleTicket({ ticketId: availableTicket._id, status: 'closed' }));
    props.resetView()
  }


  const skip = async () => {

    dispatch(skipTicket({ ticketId: availableTicket._id, locked: false, lockedBy: '' }));
    props.resetView()
  }

  return (
    <div className='editTicket box'>
      {availableTicket._id === undefined ? <div>No Tickets Available for handling</div> :
        <div>
          <div className='content'>
            <div> Id:  {availableTicket._id}</div>
            <div> Status: {availableTicket.status}</div>
            <div> Title: {availableTicket.title}</div>
            <div> Description:  {availableTicket.description}</div>
            <div> Comments: {availableTicket.comments}</div>
            <div className='actions'><button onClick={editTicket} >Handle Ticket</button> <button onClick={skip}>Skip Ticket</button></div>
          </div>
        </div>}

    </div>
  )
}
