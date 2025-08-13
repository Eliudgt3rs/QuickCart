import { Inngest } from "inngest";
import User from "@/models/User";
import connectDB from "./db";
import Order from "@/models/order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest function to save user data to a MongoDB database
export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-from-clerk",
    },
    {
        event: "clerk/user.created",
        //name: "Sync User Creation",
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            _id: id,
            name: first_name + ' ' + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        };
        await connectDB();
        await User.create(userData)
    }

)


// Inngest function to update user data in the MongoDB database
export const syncUserUpdation = inngest.createFunction(
    {
        id: "update-user-from-clerk",
    },
    {
        event: "clerk/user.updated",
        //name: "Sync User Update",
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const userData = {
            name: first_name + ' ' + last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
        };
        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
)

// Inngest function to delete user data from the MongoDB database
export const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-from-clerk",
    },
    {
        event: "clerk/user.deleted",
        //name: "Sync User Deletion",
    },
    async ({ event }) => {
        const { id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
);

//Inngest Function to create user order in Database
export const createUserOrder = inngest.createFunction(
    {
        id: 'create-user-order',
        batchEvents: {
            maxsize: 5,
            timeout: '5s'
        }
    },
    { event: 'order/created' },
    async ({ events }) => {
        
        const order = events.map((event) => {
            return {
            userId: event.data.userId,
            items: event.data.items,
            amount: event.data.amount,
            address: event.data.address,
            date: event.data.date
            }
        })

        await connectDB()
        await Order.insertMany(orders)

        return { success: true, processed: orders.length };
    }

)