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
var geocoder = require("geocoder");

populateDB();

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
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
mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
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

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use(indexRoutes);
app.get("*", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started");
});