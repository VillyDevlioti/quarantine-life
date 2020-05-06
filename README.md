# QuarantineLife

April 2020
"This is weird times" said.... pretty much everyone. 
But you know what's weirder and equally hillarious? 
All the stuff people are doing during this quarantine. 
From Fans-only (wink wink) content, to extreme cat yoga,
there's something for everyone. 

So go ahead, sit back, grab your popcorn and enjoy a feast
of #Quarantine life tips. 

----
This is a simple app, which uses Twitter stream (npm Twitter) to query the platform
for #QuarantineLife content. 

All results are stored in MongoDB - we are using a capped collection here because duh - 
and we push it to the front end using react. 

Tehcnologies used
- Bootstrap
- React
- Node / npm 
- MongoDB

Libraries and Packages Used
- Animate.css 
- Axios
- Twitter

Future expansions
- Add support for user input, so that users can lookup the hashtag/keyword they please
- add geolocation - potentially use mapbox
- Create a replica set for mongoDB, in order to stop calling the api every x seconds on the front end.

# Log

- 04.30.2020: Works on localhost. My localhost. Not yours. 
- 05.05.2020: First part of development is complete on localhost