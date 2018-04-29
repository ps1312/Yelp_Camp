var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var populateDB = require("./seed");
var passport = require("passport");
var localStrategy = require("passport-local");
var expressSession = require("express-session");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var config = require("./config/default.json");

//Qual banco sera usado
var dbEnv = process.env.NODE_ENV;
if (dbEnv === undefined) {
  var dbUrl = config["DBURL"];
} else {
  var dbUrl = config[dbEnv];  
}

//populateDB();

app.use(expressSession({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

var campgroundsRoutes = require("./routes/campgrounds");
var commentsRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useMongoClient: true});
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
                              //comes with passport-local-mongoose
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});
app.locals.moment = require('moment');

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use(indexRoutes);
app.get("*", function(req, res){
  res.redirect("/");
});

app.listen(8000, function(){
  console.log("Server started");
});

module.exports = app;