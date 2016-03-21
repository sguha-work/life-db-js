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
This section contains the description of the public methods availeble in LifeDB class.
* **1> The constructor**

When the database is initialized the constructor is called. The parameters of the constructor is described below.

| Parameter | Type | Description |
|:-------|:----------:| :------|
| databaseName | `String` | Mandetory, The name of the database, If not provided console error will be thrown|


**Usage**
```javascript
 var ldb = new LifeDB("my-db"); // my-db is the database name
```
**Note:** If previous backed up data exists in sessionStorage the data will be restored autometically in time of initializing the database
* **2> insert**

insert method can be used for inserting single or multiple data in the database

| Parameter | Type | Description |
|:-------|:----------:| :------|
| pageName | `String` | Mandetory, The name of the page where the record is going to, If not provided console error will be thrown|
| record | `Object`/`Array` | The record or list of records to insert|
| backupDatabase | `Boolean` | Optional, default `true`. If set to false the database will not be backed up in sessionStorage


**Usage**
```javascript
 var ldb = new LifeDB("my-db"); // my-db is the database name
 // inserting list of records
 ldb.insert("student", [{name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}], true);
 // inserting a single record
 ldb.insert("student", {name: "angshu", age: 27}, true);
```  

 **Note:** You can use a insert method from inside a loop to insert multiple data as record format
 
 * **3> insert**

insert method can be used for inserting single or multiple data in the database

| Parameter | Type | Description |
|:-------|:----------:| :------|
| pageName | `String` | Mandetory, The name of the page where the record is going to, If not provided console error will be thrown|
| queryString | `String` | The query string, Optional, if not provided all of the page data will be returned, default "" |
| limit | `Array` | Optional, array of 2 numbers first the lower limit 2nd the upper limit, default [0, 0]
| sort | `Array` | Optional, array of 2 strings first the attribute name 2nd the direction of sort default ["", ""]

**Usage**
```javascript
 
```  

 **Note:** You can use a insert method from inside a loop to insert multiple data as record format
 
