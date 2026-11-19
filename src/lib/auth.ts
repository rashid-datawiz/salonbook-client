import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";


const client = new MongoClient(process.env.DB_URI as string);
const db = client.db("a9-salonbook"); // database name which will create in mongodb


export const auth = betterAuth({
    database: mongodbAdapter(db, {
    client,
  }),

  user: {
       additionalFields: {
          role: {
              type: ["admin", "user"],
              input: false,
              defaultValue: "user"
            } 
        }
    },
  //...other options
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
});