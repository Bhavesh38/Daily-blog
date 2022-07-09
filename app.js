const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const _ = require("lodash");


// Load the full build lodash.
const _ = require('lodash');
const { query } = require("express");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


// geeting the Date
const event = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
const today=event.toLocaleDateString(undefined, options)


// connecting to database
mongoose.connect("mongodb://localhost:27017/blogsList", { useNewUrlParser: true });

//creating the schema
const blogsSchema = {
    blogTitle: String,
    blogContent: String
};

const Blog = mongoose.model("Blog", blogsSchema);

const blog1 = new Blog({
    blogTitle: "Home",
    blogContent: homeStartingContent
});


//home page
app.get("/", function (req, res) {
    Blog.find({}, function (err, foundItems) {
        res.render("home", {today:today, homeStartingContent: homeStartingContent, newListItems: foundItems });
    });
});

app.get("/compose", function (req, res) {
    res.render("compose",{today:today});
});


app.post("/compose", function (req, res) {
    const blog = new Blog({
        blogTitle: req.body.postTitle,
        blogContent: req.body.postBody
    })
    blog.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
});

app.get("/blogs/:blogName", function (req, res) {
    const blogTitleName =(req.params.blogName) ;
    Blog.findOne({ blogTitle: blogTitleName }, function (err, blog) {
        res.render("post", {
            today:today,
            newPageTitle: blog.blogTitle,
            newPageTitleContent: blog.blogContent
        });
    });
});



// about page
app.get("/about", function (req, res) {
    res.render("about", {today:today, aboutContent: aboutContent });
});

// contact page
app.get("/contact", function (req, res) {
    res.render("contact", {today:today, contactContent: contactContent });
});





app.listen(3000, function () {
    console.log("server is running on 3000.");
});

// app.get("/", function (req, res) {
//     Blog.find({}, function (err, foundItems) {
//         if (foundItems.length === 0) {
//             Blog.insertMany(defaultBlogs, function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log("Succefully added");
//                 }
//             });
//             res.redirect("/");
//         }
//         else {
//             res.render("home", { homeStartingContent: homeStartingContent, newListItems: foundItems });
//         }
//     })
//     // res.render("home",({homeStartingContent:homeStartingContent,posts:posts}));
// });



//compose page



// app.post("/compose", function (req, res) {
//     const blog = new Blog({
//         blogTitle: req.body.postTitle,
//         blogContent: req.body.postBody
//     });
//     blog.save();
//     res.render("post",{newPageTitle: req.body.postTitle, newPageTitleContent: req.body.postBody});
//     res.redirect("/");
// });

// app.get("/blogs/:blogName", function (req, res) {
//     const blogTitleName = _.toLower(req.params.blogName);
//     let pass = false;
//     Blog.findOne({ blogTitle: blogTitleName }, function (err, foundBlog) {
//         if (!err) {
//             pass = true;
//             res.render("post", { newPageTitle: blogTitleName, newPageTitleContent: foundBlog.blogContent });
//         }
//         else {
//             console.log(err);
//         }

//     });
//     if (pass === false) {
//         res.render("post", { newPageTitle: "Not found", newPageTitleContent: " " })
//     }


// });

// app.get("/blogs/:blogName",function(req,res){
//     const blogTitleName=_.toLower(req.params.blogName);
//     Blog.findOne({blogTitle: blogTitleName},function(err,foundBlog){
//         if(foundList)
//         {

//         }
//     })
// })
// express routing and creating page dynamically
// app.get("/posts/:postName", function (req, res) {
//     const blogTitleName=_.toLower(req.params.postName);
//     let pass = false;

//     Blog.findOne({ blogTitle: blogTitleName }, function (err, foundList) {
//     //     if (!err) {
//     //         pass=true;
//             res.redirect("post/"+blogTitleName,{newPageTitle:foundList.blogTitle,newPageTitleContent:blogContent});
//     //     //   if (!foundList) {
//         //     //create a new list
//         //     const list = new List({
//         //       name: customListName,
//         //       items: defaultItems
//         //     });
//         //     list.save();
//         //     res.redirect("/" + customListName);
//         //   }
//         //   else {
//         //     //show an existing list
//         //     res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
//           }
//         }
//       })

//     // defaultBlogs.forEach(function (post) {
//     //     // creating empty array so that new page will be only 1 content.

//     //     if (_.lowerCase(post.blogTitle) === _.lowerCase(req.params.postName)) {
//     //         // creating new page according to query similar to home page
//     //         res.render("post", ({ newPageTitle: post.blogTitle, newPageTitleContent: post.blogContent }));
//     //         pass = true;
//     //     }
//     // })
//     if (pass === false) {
//         res.render("post", ({ newPageTitle: "Not Found", newPageTitleContent: "" }));
//     }
// });



// app.get("/posts/",function(req,res){
//     res.render("home",({mainTitle:"Home",homeStartingContent:homeStartingContent,posts:posts}));
// });

