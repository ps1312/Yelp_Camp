# Yelp_Camp

Simple Node.JS RESTful application created along with Udemy course "The Web Developer Bootcamp" with a few changes. For deveopment, MongoDB is used localy and for production is used MLab.

---
# Setup
To run this app, simply set these environment variable:
```
export GOOGLEAPIKEY=your google api key
```
and export a config.json file with:
```
{
    "SESSION_SECRET": "session_secret_here",
    "DBURL": "production db url",
    "test": "test db url"
}
```
and you're good to go. If you plan to deploy this app on Heroku you need to set environment variable there too. Just write this command on the command line, make sure you have a config.json with the values above:
```
heroku config:set GOOGLEAPIKEY=your google api key
```
or go to your heroku app page and set them on Config Vars in Settings.

Visit at https://role-camp.herokuapp.com/
