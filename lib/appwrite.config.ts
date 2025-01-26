import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY_SECRET,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY_SECRET!);

const database = new sdk.Databases(client);
const storage = new sdk.Storage(client);
const messaging = new sdk.Messaging(client);
const users = new sdk.Users(client);
