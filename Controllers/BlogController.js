import { BlogModel } from "../models/BlogModel.js";
import mongoose from "mongoose";

export const myBlogs = async (req, res) => {
  let userId = req.session.userId;
  const BlogsData = await BlogModel.find({
    userId: userId,
  });
  res.render("myBlogs", { BlogsData: BlogsData });
};
export const addBlog = (req, res) => {
  res.render("addBlogs", { message: null });
};
export const addBlogToDB = (req, res) => {
  const { title, body } = req.body;
  const newBlog = new BlogModel({
    title: title,
    body: body,
    userId: req.session.userId,
  });
  newBlog
    .save()
    .then((response) => {
      res.redirect("/myblogs");
    })
    .catch((err) => {
      res.redirect("/addblog", {
        message: "cannot Publish Blog at this moment, please try later ",
      });
    });
};

export const deleteBlog = (req, res) => {
    let Id = req.params.id;
    BlogModel.findOneAndDelete({
      _id: Id,
    })
    .then(() => {
      res.redirect("/myblogs?message=Deleted Successfully!");
    })
    .catch(() => {
      res.redirect("/myblogs?message=Failed to Delete");
    });
  
  };

export const editBlog =async (req, res) => {
  try{
    let Id = req.params.id;
    let blogData =  await BlogModel.findOne({
      _id: Id,
    })
    console.log(blogData);
    
  res.render("editBlog",{message:null,blogData})
  }
catch{err=>{
  res.render("editBlog",{message:"Failed to Update the blog",blogData:null})
}
} 
}

export const UpdateBlog = (req,res)=>{
  let Id = req.params.id
  BlogModel.findByIdAndUpdate({_id:Id},req.body).then(response=>{
    res.redirect("/myblogs?message=Updated Successfully!");
  })
  .catch(error=>{
    res.render("editBlog",{message:"Failed to Update",blogData:null})
  })
}
export const home = async (req, res) => {
  let perpage = 5;
  let page = req.query.page || 1;
  let sort = req.query.sort || 'title'
  try{
    const blogs = await BlogModel.find()
    .sort({[sort]:1 })
    .skip((perpage * page)- perpage)
    .limit(perpage)

    let count = await BlogModel.countDocuments();
    let totalPages = Math.ceil(count/perpage)    
    res.render("home",{message:null,BlogsData:blogs,totalPages:totalPages,current:page,sort});
  }catch{err=> res.render("home",{message:err,BlogsData:null,totalPages:null,current:null})}
};