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

### Installation
 * Download the **[`Life-db files`](https://github.com/sguha-work/life-db-js/archive/production.zip)**
 * Unzip the archive and copy the file "life-db-min.js"
 * Include "life-db-min.js" in your project (Check **[the usage guide](#usage-guide)** for details).
 * Prepare the object of LifeDB (Check **[the usage guide](#usage-guide)** for details).
 * Start using the methods and classes available under the **LifeDB** class to generate charts in your project.. 

### Usage Guide
#### For browser environment
* **Step 1:** Copy the life-db-min.js or life-db.js file inside your project. (Check **[the file description](#usage-guide)** for details about the files inside the archive)
* **Step 2:** Write a script tag in the <head> section of the page where you want to use LifeDB as follows
```html
<script type="text/javascript" src="life-db-min.js"></script>
```
* **Step 3:** Prepare an object of LifeDB
 ```javascript
 var ldb = new LifeDB("my-db"); // my-db is the database name
 ```
* **Step 4:** Start using methods of LifeDB

#### For node environment
* **Step 1:** Copy the life-db-min.js or life-db.js file inside your project. (Check **[the file description](#usage-guide)** for details about the files inside the archive)
* **Step 2:** Write a script tag in the <head> section of the page where you want to use LifeDB as follows
```html
<script type="text/javascript" src="life-db-min.js"></script>
```
* **Step 3:** Prepare an object of LifeDB
 ```javascript
 var ldb = new LifeDB("my-db"); // my-db is the database name
 ```
* **Step 4:** Start using methods of LifeDB

### Function Description
This section contains the description of the public methods availeble in LifeDB class. Examples are given in the next section
* **1> The constructor**

When the database is initialized the constructor is called. The parameters of the constructor is described below.

| Parameter | Type | Description |
|:-------|:----------:| :------|
| databaseName | `String` | Mandetory, The name of the database, If not provided console error will be thrown|

  
 
 
