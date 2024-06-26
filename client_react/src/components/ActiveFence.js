import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';

import {
  getAllUsers, getAllTickets, getTicketsByUser, getTicketsLockedByUser,
  handleTicket, getAvailableTicket, resetDBEntities, getAvailableUser, getUsersByUser, getUsersLockedByUser
} from '../redux/entitiesState';
import { Users } from './User/Users';
import { Tickets } from './Ticket/Tickets';
import { TicketsByUser } from './Ticket/TicketsByUser';
import { TicketsLockedByUser } from './Ticket/TicketsLockedByUser';
import { EditTicket } from './Ticket/EditTicket';
import { EditUser } from './User/EditUser';
import { UsersHandledByUser } from './User/UsersHandledByUser';
import { UsersLockedByUser } from './User/UsersLockedByUser';



export const ActiveFence = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getAllTicketsNoFilter();
  }, [dispatch])

  const loading = useSelector((state) => state.entitiesState.loading);
  const sessionID = useSelector((state) => state.entitiesState.sessionID);
  const availableTicket = useSelector((state) => state.entitiesState.availableTicket);
  const error_message = useSelector((state) => state.entitiesState.message);

  const [message, setMessage] = useState('');
  const [header, setHeader] = useState('');
  const [view, setView] = useState('');
  const [handledTicket, setHandledTicket] = useState({});

  const getUsers = async (filter) => {
    dispatch(getAllUsers(filter));
    setMessage('');
    setView('allUsers');
  }

  const getAllUsersNoFilter = async () => {
    getUsers({});
    setHeader('All Users');
    setView('allUsers');
  }

  const getUnhandledUsers = async () => {
    setHeader('All Unhandled Users');
    getUsers({ status: 'open' });
  }

  const getUsersHandledByUser = async () => {
    dispatch(getUsersByUser());
    setMessage('');
    setHeader('All Users Handled By Current User');
    setView('usersByUser');
  }

  const getLockedUsersForUser = async () => {
    dispatch(getUsersLockedByUser());
    setHeader('All Users Locked By Current User');
    setView('usersLockedByUser');
  }


  const getTickets = async (filter) => {
    setHandledTicket({});
    dispatch(getAllTickets(filter));
    setMessage('');
    setView('allTickets');
  }

  const getAllTicketsNoFilter = async () => {
    setHeader('All Tickets');
    getTickets({});
  }

  const getOpenTickets = async () => {
    setHeader('All Unhandled Tickets');
    getTickets({ status: 'open' });
  }

  const getTicketsHandledByUser = async () => {

    dispatch(getTicketsByUser());
    setMessage('');
    setHeader('All Tickets Handled By Current User');
    setView('ticketsByUser');
  }


  const getLockedByUser = async () => {

    dispatch(getTicketsLockedByUser());
    setMessage('');
    setHeader('All Tickets Locked By Current User');
    setView('ticketsLockedByUser');
  }


  const getNextTicket = async () => {
    await dispatch(getAvailableTicket({ current: availableTicket }));
    setHeader('Handle Ticket');
    setMessage('');
    setView('handledTicket');
  }


  const getNextUser = async () => {
    await dispatch(getAvailableUser({ current: availableTicket }));
    setHeader('Handle User');
    setMessage('');
    setView('handledUser');
  }

  const resetDB = async () => {
    await dispatch(resetDBEntities());
    setView('');
    setHeader('');
    setMessage('db reset to initial state');

  }



  return (
    <div className='warpper'>
      <div className='reset'>
        <Button backgroundColor="danger" onClick={resetDB}>
          Reset DB (click to reset entities)
        </Button> </div>
      <div className='reset' >Current User SessionID  {sessionID}</div>
      <div className='navigation'>
        <div>
          <Button backgroundColor="primary" onClick={getAllTicketsNoFilter} >
            get All Tickets
          </Button> </div>
        <div>
          <Button backgroundColor="primary" onClick={getOpenTickets}>
            get UnHandled Tickets
          </Button>  </div>
        <div>
          <Button backgroundColor="primary" onClick={getTicketsHandledByUser}>
            get Tickets Handled By User
          </Button>  </div>
        <div>
          <Button backgroundColor="primary" onClick={getLockedByUser}>
            get Tickets Locked By User
          </Button> </div>
        <div>
          <Button backgroundColor="primary" onClick={getNextTicket}>
            Get Next Ticket
          </Button> </div>
      </div>
      <div className='navigation'>
        <div>
          <Button backgroundColor="link" onClick={getAllUsersNoFilter}>
            get All Users
          </Button> </div>
        <div>
          <Button backgroundColor="link" onClick={getUnhandledUsers} >
            get UnHandled Users
          </Button>
        </div>
        <div>
          <Button backgroundColor="link" onClick={getUsersHandledByUser}>
            get Users Handled By User
          </Button></div>
        <div>
          <Button backgroundColor="link" onClick={getLockedUsersForUser}>
            get Users Locked By User
          </Button>
        </div>
        <div>
          <Button backgroundColor="link" onClick={getNextUser}>
            Get Next User
          </Button>
        </div>
      </div>
      <div className='grid'>
        <div className='views'> {header}</div>
        {view === 'allUsers' && (
          <Users />
        )}
        {view === 'allTickets' && <Tickets />}
        {view === 'ticketsLockedByUser' && <TicketsLockedByUser />}
        {view === 'ticketsByUser' && <TicketsByUser />}
        {view === 'handledTicket' && <EditTicket ticket={handledTicket} handleNext={handleTicket} resetView={getAllTicketsNoFilter} />}
        {view === 'handledUser' && <EditUser resetView={getUsers} />}
        {view === 'usersByUser' && <UsersHandledByUser />}
        {view === 'usersLockedByUser' && <UsersLockedByUser />}
      </div>
      <div className='has-background-success-light has-text-success'> {message}</div>
      <div className='has-background-danger-light'> {error_message}</div>


    </div >
  )
}
