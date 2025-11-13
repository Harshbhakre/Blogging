import express from 'express';
import {
  signupPage,
  loginPage,
  signup,
  login,
  allUsers,
  logout,
 
} from "./Controllers/UserController.js";
import {  home, addBlog,
  myBlogs,addBlogToDB,deleteBlog,editBlog,UpdateBlog} from './Controllers/BlogController.js'
import { AuthReq } from './utils/Auth.js';
export const Routes =  express.Router()

Routes.get("/loginPage", loginPage);
Routes.get("/", home);
Routes.get("/signupPage", signupPage);
Routes.post("/signup", signup);
Routes.post("/login", login);
Routes.get("/allusers",AuthReq, allUsers);
Routes.get("/logout", logout);
Routes.get("/myblogs",AuthReq, myBlogs);
Routes.get("/addblog",AuthReq, addBlog);
Routes.post("/addblog",AuthReq,addBlogToDB)
Routes.post("/delete/:id",deleteBlog)
Routes.get("/editBlog/:id",editBlog)
Routes.post("/edit/:id",UpdateBlog)