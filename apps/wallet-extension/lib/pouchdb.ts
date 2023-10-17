import PouchDB from "pouchdb";

const db = new PouchDB(process.env.NEXT_PUBLIC_LOCAL_POUCH_DB);

export default db;
