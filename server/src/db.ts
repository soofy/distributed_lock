import User from './models/User';
import Ticket from './models/Ticket';
import { Types as mongooseTypes } from 'mongoose'
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export const lockUser = async (req) => {
  try {
    const { id } = req.params;
    const collections: any = await User.findOneAndUpdate({ '_id': id }, { $set: { locked: true } });
    return collections;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export const toggleTicketStatus = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) => {
  try {
    let { ticketId, status } = req.body;
    const ticket: any = await Ticket.findOneAndUpdate({ _id: new mongooseTypes.ObjectId(ticketId) }, { $set: { status, handledBy: req.sessionID, lockedBy: null } });
    return ticket;

  } catch (error) {
    console.log(error);
    return [];
  }
}


export const releaseTicketLock = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) => {
  try {
    let { ticketId } = req.body;
    const ticket: any = await Ticket.findOneAndUpdate({ _id: new mongooseTypes.ObjectId(ticketId) }, { $set: { locked: false, lockedBy: null } });
    return ticket;

  } catch (error) {
    console.log(error);
    return [];
  }
}



export const getAvailableTicket = async (req) => {
  try {
    let { current } = req.body;
    let query: any = { locked: false, status: 'open' };

    if (current?._id) {
      query = {
        ...query, _id: { $ne: new mongooseTypes.ObjectId(current._id) }
      }
    }
    const availableTicket: any = await Ticket.findOneAndUpdate(query, { $set: { locked: true, lockedBy: req.sessionID } });
    return availableTicket;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getAvailableUser = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) => {
  try {
    let { lockedBy, current } = req.body;
    if (lockedBy !== '')
      lockedBy = req.sessionID;
    let query: any = { locked: false };
    if (current?._id) {
      query = {
        ...query, _id: { $ne: new mongooseTypes.ObjectId(current._id) }
      }
    }
    const availableTicket: any = await User.findOneAndUpdate(query, { $set: { locked: true, lockedBy: lockedBy } });
    return availableTicket;

  } catch (error) {
    console.log(error);
    return [];
  }
}


export const getUsersHandledByUser = async (req) => {
  try {
    const filter = { handledBy: req.sessionID, status: 'closed' }
    const tickets: any = await User.find(filter);
    return tickets;

  } catch (error) {
    console.log(error);
    return [];
  }
}



export const getUsersLockedByUser = async (req) => {
  try {
    const filter = { lockedBy: req.sessionID, locked: true }
    const users: any = await User.find(filter);
    return users;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export const handleUser = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) => {
  try {
    let { userId, status } = req.body;
    const ticket: any = await User.findOneAndUpdate({ _id: new mongooseTypes.ObjectId(userId) }, { $set: { status, handledBy: req.sessionID, lockedBy: null } });
    return ticket;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export const releaseUserLock = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) => {
  try {
    let { userId } = req.body;
    const user: any = await User.findOneAndUpdate({ _id: new mongooseTypes.ObjectId(userId) }, { $set: { locked: false, lockedBy: null } });
    return user;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export const releaseUser = async (req) => {
  try {
    const { id } = req.params;
    const collections: any = await User.findOneAndUpdate({ '_id': id }, { $set: { locked: false } });
    return collections;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getUsers = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise<any[]> => {
  try {
    const filter = req.body;
    const users: any = await User.find(filter);
    return users;

  } catch (error) {
    console.log(error);
    return [];
  }

}


export const resetDB = async (): Promise<void> => {
  try {
    const users: any = await User.find({});
    let updateArray = [];

    for (const user of users) {

      updateArray.push({
        updateOne: {
          filter: { _id: new mongooseTypes.ObjectId(user._id) },
          update: {
            $set: { locked: false, status: 'open' },
            $unset: { lockedBy: null }
          }
        }
      });
    }
    await User.bulkWrite(updateArray);
    updateArray = [];

    const tickets: any = await Ticket.find({});
    for (const ticket of tickets) {
      updateArray.push({
        updateOne: {
          filter: { _id: new mongooseTypes.ObjectId(ticket._id) },
          update: {
            $set: { locked: false, status: 'open' },
            $unset: { lockedBy: null, handledBy: null }
          }
        }
      });
    }

    await Ticket.bulkWrite(updateArray);

  } catch (error) {
    console.log(error);
  }
}


export const getTickets = async (req) => {
  try {
    const filter = req.body;
    const tickets: any = await Ticket.find(filter);
    return tickets;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getTicketsHandledByUser = async (req) => {
  try {
    const filter = { handledBy: req.sessionID, status: 'closed' }
    const tickets: any = await Ticket.find(filter);
    return tickets;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getTicketsLockedByUser = async (req) => {
  try {
    const filter = { lockedBy: req.sessionID, locked: true }
    const tickets: any = await Ticket.find(filter);
    return tickets;

  } catch (error) {
    console.log(error);
    return [];
  }
}


export const getOpenTickets = async () => {
  try {
    const tickets: any = await Ticket.find({ status: { $ne: 'closed' } });
    return tickets;

  } catch (error) {
    console.log(error);
    return [];
  }
}

