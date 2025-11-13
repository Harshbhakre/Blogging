import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {Routes} from './routers.js'
import session from "express-session";
import { checkAuth } from "./utils/Auth.js";

dotenv.config();

let app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then((response) => {
    console.log("connect to DB");
  })
  .catch((err) => {
    console.log("failed to connecting DB");
  });

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:"dummy key",
  resave:true,
  saveUninitialized:true
}))
app.use(checkAuth)
app.use(Routes)

export default app;
