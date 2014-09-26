photostream-1.0
===============

This is the sourcecode for my first app. The app offers live streaming of photos. Its main purpose is to allow easy photosharing and streaming at events. To use it, here are a few things to know:

This project requires the following: 
## A gmail account.
## A flickr account.
## An IFTTT recipe that moves email attachments from your gmail account to your flickr account. 
## Flickr API Key and User Id

Getting Started: 

1. Set up a gmail account for your event. ie. myevent@gmail.com.

2. Set up a Flickr account for your event. 

3. Set up an IFTTT recipe that moves the attachments sent to your new gmail account into your new flickr account. 

4. Get an API Key for Flickr through thier website. Using this key, insert your info into application.js file where indicated ([INSERTHERE]). Flickr's API docs can help walk you through the ins and outs of using thier API. 

5. For your event, have all guests email thier photos to your new gmail account. IFTTT will check the gmail account every so oftern and move all attachments from gmail to Flickr. Meanwhile, this app will continually reach into Flickr and pull out the photos, organise them based on aspect ratio (landscape vs portrait) and display them for you! 

Visit This App Live: https://dl.dropboxusercontent.com/u/1062541/GA%20-%20FEWD%20-%20Final%20Projects/section-12/courtney-mcilhenny/index.html


