//add.test.js
import * as dotenv from 'dotenv'
import mongoose from "mongoose";
import { getAvailableTicket } from "../src/db";
dotenv.config();
mongoose.set('strictQuery', true);

const start = async () => {
    try {
        const conn_string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/test?retryWrites=true&w=majority`;
        await mongoose.connect(conn_string);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

beforeAll(done => {
    done()
})

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})

const current = JSON.parse('{"_id":"662fe2b71dc2004a8f149064","status":"open","comments":"another new comments","description":"yet another new ticket","title":"yet another new Ticket","locked":false}');
test('test getAvailableTicket', async () => {
    await start().then(async () => {
        return expect(await getAvailableTicket({ sessionID: "uvuCjKLuLxpRcVCydnGZk5KejOhsDf6r", body: { current } })).toBe(null);

    })
});