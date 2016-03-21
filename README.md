# LifeDB
 
### What is LifeDB??
   It is a lighweight, JSON based, no-sql formatted data base for browser and also it works in nodejs environment. In node environment it works like a flatfile database system. The program is intelligent enough to detect the environment where it is running and modify itself for performence.
  
### How does the DB work??
  In browser environment the DB use HTML5 sessionStorage for storing the data. If sessionStorage is not availeble it uses the window object of browser. In that case data will not be preserved after closing the page. Users also can avoid using sessionStorage by not backing up the database and reduce memory usage of browser
  
  In node environment the DB uses the [fs package](https://www.npmjs.com/package/fs) to store data in a file and also for restoring data from DB file. As like browser user also can avoid using file-system by not backing up the database.
  
### Version
1.0

### Requirements
#### For browser environment
* Internet Explorer ( >=8.0 )
* GoogleChrome ( >=4.0 )
* FireFox ( >=3.5 )
* Safari ( >= 4.0 )
* Opera ( >=11.5 )
#### For node environment
* fs ( >=0.0.2 )
* node ( >=0.10.37 ) [ developped in this version ]


 




  
 
 
