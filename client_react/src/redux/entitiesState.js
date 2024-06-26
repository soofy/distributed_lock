import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk('collectionSlice/getUsers', async (payload) => {
  const response = await axios.post('http://localhost:3200/api/users', payload, { withCredentials: true });
  return response.data;
});

export const getUsersByUser = createAsyncThunk('collectionSlice/getUsersByUser', async () => {
  const response = await axios.get('http://localhost:3200/api/users/user', { withCredentials: true });
  return response.data;
});

export const getAllTickets = createAsyncThunk('collectionSlice/getTickets', async (payload) => {
  const response = await axios.post('http://localhost:3200/api/tickets', payload, { withCredentials: true });
  return response.data;
});

export const getTicketsByUser = createAsyncThunk('collectionSlice/getTicketsByUser', async () => {
  const response = await axios.get('http://localhost:3200/api/tickets/user', { withCredentials: true });
  return response.data;
});


export const getTicketsLockedByUser = createAsyncThunk('collectionSlice/getTicketsLockedByUser', async () => {
  const response = await axios.get('http://localhost:3200/api/tickets/user/locked', { withCredentials: true });
  return response.data;
});

export const handleTicket = createAsyncThunk('collectionSlice/handleTicket', async (payload) => {

  const response = await axios.post('http://localhost:3200/api/tickets/handle', payload, { withCredentials: true });
  return response.data;
});

export const skipTicket = createAsyncThunk('collectionSlice/skipTicket', async (payload) => {

  const response = await axios.post('http://localhost:3200/api/tickets/skip', payload, { withCredentials: true });
  return response.data;
});

export const getAvailableTicket = createAsyncThunk('collectionSlice/availableTicket', async (payload) => {

  const response = await axios.post('http://localhost:3200/api/tickets/available', payload, { withCredentials: true });
  return response.data;
});

export const getAvailableUser = createAsyncThunk('collectionSlice/availableUser', async (payload) => {

  const response = await axios.post('http://localhost:3200/api/users/available', payload, { withCredentials: true });
  return response.data;
});

export const handleUser = createAsyncThunk('collectionSlice/handleUser', async (payload) => {

  console.log(payload);
  const response = await axios.post('http://localhost:3200/api/users/handle', payload, { withCredentials: true });
  return response.data;
});

export const skipUser = createAsyncThunk('collectionSlice/skipUser', async (payload) => {

  console.log(payload);
  const response = await axios.post('http://localhost:3200/api/users/skip', payload, { withCredentials: true });
  return response.data;
});

export const getUsersLockedByUser = createAsyncThunk('collectionSlice/getUsersLockedByUser', async () => {
  const response = await axios.get('http://localhost:3200/api/users/user/locked', { withCredentials: true });
  return response.data;
});

export const resetDBEntities = createAsyncThunk('collectionSlice/resetDBEntities', async () => {

  const response = await axios.get('http://localhost:3200/api/db/reset', { withCredentials: true });
  return response.data;
});




const initialState = {
  loading: false,
  allUsers: [],
  allTickets: [],
  handledByUserTickets: [],
  lockedByUserTickets: [],
  sessionID: '',
  availableTicket: {},
  availableUser: {},
  handledByUserUsers: [],
  lockedByUserUsers: [],
  error: ''
};
const slice = createSlice({
  name: 'entitiesSlice',
  initialState,
  reducers: {
    toggleTicketLock: (state, action) => {

    }
  },
  extraReducers: (builder) => {


    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {

      state.loading = false;
      state.allUsers = action.payload;
      state.message = '';
    })

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.allUsers = [];
      state.message = action.error.message;
    })

    builder.addCase(getAllTickets.fulfilled, (state, action) => {

      state.loading = false;
      state.allTickets = action.payload.tickets;
      state.sessionID = action.payload.sessionID;
      state.message = '';

    })

    builder.addCase(getAllTickets.rejected, (state, action) => {
      state.loading = false;
      state.allTickets = [];
      state.message = action.error.message;
    })

    builder.addCase(getTicketsByUser.fulfilled, (state, action) => {

      state.loading = false;
      state.handledByUserTickets = action.payload.tickets;
      state.sessionID = action.payload.sessionID;
      state.message = '';

    })

    builder.addCase(getTicketsByUser.rejected, (state, action) => {
      state.loading = false;
      state.handledByUserTickets = [];
      state.message = action.error.message;
    })

    builder.addCase(getTicketsLockedByUser.fulfilled, (state, action) => {

      state.loading = false;
      state.lockedByUserTickets = action.payload.tickets;
      state.sessionID = action.payload.sessionID;
      state.message = '';

    })

    builder.addCase(getTicketsLockedByUser.rejected, (state, action) => {
      state.loading = false;
      state.lockedByUserTickets = [];
      state.message = action.error.message;
    })

    builder.addCase(getUsersLockedByUser.fulfilled, (state, action) => {

      state.loading = false;
      state.lockedByUserUsers = action.payload.tickets;
      state.sessionID = action.payload.sessionID;
      state.message = '';

    })

    builder.addCase(getUsersLockedByUser.rejected, (state, action) => {
      state.loading = false;
      state.lockedByUserUsers = [];
      state.message = action.error.message;
    })

    builder.addCase(handleTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.message = '';

    })

    builder.addCase(handleTicket.rejected, (state, action) => {
      state.loading = false;

      state.message = action.error.message;
    })

    builder.addCase(getAvailableTicket.fulfilled, (state, action) => {

      state.loading = false;
      state.availableTicket = action.payload;
      state.message = '';

    })

    builder.addCase(getAvailableTicket.rejected, (state, action) => {
      state.loading = false;
      state.message = action.error.message;
    })

    builder.addCase(getAvailableUser.fulfilled, (state, action) => {
      state.loading = false;
      state.availableUser = action.payload;
      state.message = '';

    })

    builder.addCase(getAvailableUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.error.message;


    })
    builder.addCase(getUsersByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.handledByUserUsers = action.payload.users;
      state.message = '';
    })

    builder.addCase(getUsersByUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.error.message;
    })

  }
});

export const { toggleTicketLock } = slice.actions
export default slice.reducer