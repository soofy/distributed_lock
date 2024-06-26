import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import cors from 'cors';
import http from 'http';
import session from 'express-session';
import {
  getTickets, getUsers, toggleTicketStatus, getAvailableTicket,
  getTicketsHandledByUser, getTicketsLockedByUser, releaseTicketLock, resetDB, getAvailableUser,
  getUsersHandledByUser, handleUser, getUsersLockedByUser, releaseUserLock
} from './db';

dotenv.config();
mongoose.set('strictQuery', true);
const app = express();
const sessionMiddleware = session({
  secret: "changeit",
  resave: true,
  saveUninitialized: true,
});

app.use(sessionMiddleware);

app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(options));

const server = http.createServer(app);

app.get("/api/tickets", async (req: Request, res: Response): Promise<Response> => {

  try {
    const tickets = await getTickets(req);
    return res.status(200).json({ tickets, sessionID: req.sessionID });
  }
  catch (err) {
    console.log(err);
    return res.status(201).json('Error');
  }
});


app.post("/api/tickets", async (req: Request, res: Response): Promise<Response> => {

  try {
    const tickets = await getTickets(req);
    return res.status(200).json({ tickets, sessionID: req.sessionID });
  }
  catch (err) {
    console.log(err);
    return res.status(201).json('Error');
  }
});

app.get("/api/tickets/user", async (req: Request, res: Response): Promise<Response> => {

  try {
    const tickets = await getTicketsHandledByUser(req);
    return res.status(200).json({ tickets, sessionID: req.sessionID });
  }
  catch (err) {
    console.log(err);
    return res.status(201).json('Error');
  }
});


app.get("/api/tickets/user/locked", async (req: Request, res: Response): Promise<Response> => {

  try {
    const tickets = await getTicketsLockedByUser(req);
    return res.status(200).json({ tickets, sessionID: req.sessionID });
  }
  catch (err) {
    console.log(err);
    return res.status(201).json('Error');
  }
});

app.post("/api/tickets/handle", async (req: Request, res: Response): Promise<Response> => {
  try {
    await toggleTicketStatus(req);
    return res.status(201).json('Ok');
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post("/api/tickets/skip", async (req: Request, res: Response): Promise<Response> => {
  try {
    await releaseTicketLock(req);
    return res.status(201).json('Ok');
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});



app.post("/api/tickets/lock", async (req: Request, res: Response): Promise<Response> => {
  try {
    await toggleTicketStatus(req);
    return res.status(201).json('Ok');
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post("/api/tickets/available", async (req: Request, res: Response): Promise<Response> => {
  try {
    const ticket = await getAvailableTicket(req);
    if (!ticket)
      return res.status(201).json({});

    return res.status(201).json(ticket);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post("/api/users", async (req: Request, res: Response): Promise<Response> => {

  try {
    const users = await getUsers(req);
    return res.status(200).json(users);
  }
  catch (err) {
    console.log(err);
    return res.status(201).json('Error');
  }
});


app.get("/api/users/user", async (req: Request, res: Response): Promise<Response> => {

  try {
    const users = await getUsersHandledByUser(req);
    return res.status(200).json({ users, sessionID: req.sessionID });
  }
  catch (err) {
    console.log(err);
    return res.status(201).json('Error');
  }
});


app.post("/api/users/available", async (req: Request, res: Response): Promise<Response> => {
  try {
    const ticket = await getAvailableUser(req);
    if (!ticket)
      return res.status(201).json({});

    return res.status(201).json(ticket);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post("/api/users/skip", async (req: Request, res: Response): Promise<Response> => {
  try {
    await releaseUserLock(req);
    return res.status(201).json('Ok');
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.post("/api/users/handle", async (req: Request, res: Response): Promise<Response> => {
  try {
    await handleUser(req);
    return res.status(201).json('Ok');
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


app.get("/api/users/user/locked", async (req: Request, res: Response): Promise<Response> => {

  try {
    const tickets = await getUsersLockedByUser(req);
    return res.status(200).json({ tickets, sessionID: req.sessionID });
  }
  catch (err) {
    console.log(err);
    return res.status(201).json('Error');
  }
});


app.get("/api/db/reset", async (req: Request, res: Response): Promise<Response> => {

  try {
    const topScores = await resetDB();
    return res.status(200).json(topScores);
  }
  catch (err) {
    console.log(err);
    return res.status(201).json('Error');
  }
});




export const start = async (): Promise<void> => {
  try {
    const conn_string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/test?retryWrites=true&w=majority`;
    await mongoose.connect(conn_string);
    server.listen(3200, () => {
      console.log('listening on *:3200');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();






