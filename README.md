# role_camp

Simple Node.JS RESTful application created along with Udemy course "The Web Developer Bootcamp" with a few changes. For database MongoDB is used localy for development and with MLab for production.

---
# Setup
To run this app, simply set these environment variables:
```
export DATABASEURL=mongodb://localhost/role_camp
export SESSION_SECRET=whatever string
export GOOGLEAPIKEY=your google api key
```
and you're good to go. If you plan to deploy this app on Heroku you need to set environment variables there too. Just write these commands on the command line:
```
heroku config:set DATABASEURL=mongodb://<dbuser>:<dbpassword>@ds215388.mlab.com:15388/role_camp
heroku config:set SESSION_SECRET=whatever string
heroku config:set GOOGLEAPIKEY=your google api key
```
or go to your heroku app page and set them on Config Vars in Settings.
