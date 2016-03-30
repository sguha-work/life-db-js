# LifeDB
 
### What is LifeDB??
   It is a lighweight, JSON based, no-sql formatted data base for browser and also for node environment. The program is intelligent enough to detect the environment where it is running and modify itself for performence.
  
### How does the DB work??
  In browser environment the DB use HTML5 sessionStorage for storing the data. If sessionStorage is not availeble it uses the window object of browser. In that case data will not be preserved after closing the page. Users also can avoid using sessionStorage by not backing up the database and reduce memory usage of browser
  
In node environment the DB works as a flat file database. i.e. the data will be stored in a text file, also user can avoid the storing of data by not backing up the database. If the data file already exists then the data will be restored autometically in time of initiation of the datbase
### Version
0.0.2
### Change log
* Bug fix for node environment
* Bug fix in initiating the database
* Documentation for using in node-environment


### Requirements
#### For browser environment
* Internet Explorer ( >=8.0 )
* GoogleChrome ( >=4.0 )
* FireFox ( >=3.5 )
* Safari ( >= 4.0 )
* Opera ( >=11.5 )

#### For node environment
* fs (>=0.0.2)
* node (>=0.10.37) (Developped in this version)

### Installation
#### For browser environment
 * Download the **[`Life-db files`](https://github.com/sguha-work/life-db-js/archive/production.zip)**
 * Unzip the archive and copy the file "life-db-min.js"
 * Include "life-db-min.js" in your project (Check **[the usage guide](#usage-guide)** for details).
 * Prepare the object of LifeDB (Check **[the usage guide](#usage-guide)** for details).
 * Start using the methods and classes available under the **LifeDB** class to generate charts in your project.
#### For node environment
 * Type the following command in your console inside your project folder. **Note: Super user authentication may be needed**
```
    npm install life-db
```    
   
  * Include life-db in your project's page wher you are going to use life-db (Check **[the usage guide](#usage-guide)** for details).
 * Prepare the object of LifeDB (Check **[the usage guide](#usage-guide)** for details).
 * Start using the metholds and classes available under the **LifeDB** class to generate charts in your project.. 


### Usage Guide
#### For browser environment
* **Step 1:** Copy the life-db-min.js or life-db.js file inside your project. (Check **[the file description](#file-description)** for details about the files inside the archive)
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
* **Step 1:** Include LifeDB inside your page 
```javascript
var ldb = require('life-db');
```
* **Step 2:** Prepare the object of LifeDB with database name
```javascript
var obj = new ldb.LifeDB("my-db");
```
* **Step 4:** Start using methods of LifeDB from the object "obj"

### Function Description
This section contains the description of the public methods availeble in LifeDB class.
* **1> The constructor**

When the database is initialized the constructor is called. The parameters of the constructor is described below.

| Parameter | Type | Description |
|:-------|:----------:| :------|
| databaseName | `String` | Mandetory, The name of the database, If not provided console error will be thrown|


**Usage "Browser"**
```javascript
 var ldb = new LifeDB("my-db"); // my-db is the database name
```
**Usage "node"**
```javascript
 var ldb = require('life-db'),
     obj = new ldb.LifeDB("my-db"); // my-db is the database name
```
**Note:** If previous backed up data exists in sessionStorage or in data file(for Node environment) the data will be restored autometically in time of initializing the database
* **2> insert**

insert method can be used for inserting single or multiple data in the database

| Parameter | Type | Description |
|:-------|:----------:| :------|
| pageName | `String` | Mandetory, The name of the page where the record is going to, If not provided console error will be thrown|
| record | `Object`/`Array` | The record or list of records to insert|
| backupDatabase | `Boolean` | Optional, default `true`. If set to false the database will not be backed up in sessionStorage


**Usage "Browser"**
```javascript
 var ldb = new LifeDB("my-db"); // my-db is the database name
 // inserting list of records
 ldb.insert("student", [{name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}], true);
 // inserting a single record
 ldb.insert("student", {name: "angshu", age: 27}, true);
```  
**Usage "node"**
```javascript
 var ldb = require('life-db'),
     obj = new ldb.LifeDB("my-db"); // my-db is the database name
 // inserting list of records
 obj.insert("student", [{name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}], true);
 // inserting a single record
 obj.insert("student", {name: "angshu", age: 27}, true);
```  

 **Note:** You can use a insert method from inside a loop to insert multiple data as record format
 
 * **3> find**

ilnsert method can be used for inserting single or multiple data in the database

| Parameter | Type | Description |
|:-------|:----------:| :------|
| pageName | `String` | Mandetory, The name of the page where the record is going to, If not provided console error will be thrown|
| queryString | `String` | The query string, Optional, if not provided all of the page data will be returned, default "" |
| limit | `Array` | Optional, array of 2 numbers first the lower limit 2nd the upper limit, default [0, 0]
| sort | `Array` | Optional, array of 2 strings first the attribute name 2nd the direction of sort default ["", ""]

The function returns a list of records. If no records matched the query or the page is empty then empty array will be returned

**Usage "Browser"**
```javascript
/*
* Assume that the database "my-db" is created and it holds 1 page named "student" and 3 records as follows
* {name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}
*/

// the following query will return all of the records of "student" page
result = ldb.find("student", "");

// Following query will return [{name: "angshu", age: 27}]
ldb.find("student", "age @eq 27");

// Following query will return []
ldb.find("student", "age @gt 27 && age @lt 30");

// Following query will return [{"name":"shyamol","age":20},{"name":"uttam","age":30}]
ldb.find("student", "",[1,2]);

// Following query will return ["name":"shyamol","age":20}, {"name":"angshu","age":27}, {"name":"uttam","age":30}]
ldb.find("student", "","",["age", "asc"]);
```
**Usage "Node"**
```javascript
/*
* Assume that the database "my-db" is created and it holds 1 page named "student" and 3 records as follows
* {name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}
*/

// the following query will return all of the records of "student" page
result = obj.find("student", "");

// Following query will return [{name: "angshu", age: 27}]
obj.find("student", "age @eq 27");

// Following query will return []
obj.find("student", "age @gt 27 && age @lt 30");

// Following query will return [{"name":"shyamol","age":20},{"name":"uttam","age":30}]
obj.find("student", "",[1,2]);

// Following query will return ["name":"shyamol","age":20}, {"name":"angshu","age":27}, {"name":"uttam","age":30}]
obj.find("student", "","",["age", "asc"]);
```
 **Note:** Check the [operator description](#operator-description) for the supported logical and comparison operators.
 
 * **4> remove**

insert method can be used for inserting single or multiple data in the database

| Parameter | Type | Description |
|:-------|:----------:| :------|
| pageName | `String` | Mandetory, The name of the page from where the record/records are going to be deleted, If not provided console error will be thrown|
| queryString | `String` | The query string, Optional, if not provided all of the page data will be deleted, default "" |
| backupDatabase | `Boolean` | Optional, control wheather data will be backed up or not , default true |
The function returns a the number of effected rows.

**Usage "Browser"**
```javascript
/*
* Assume that the database "my-db" is created and it holds 1 page named "student" and 3 records as follows
* {name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}
*/

// the following query will return 1 as 1 record is deleted from the "student" page
ldb.remove("student", "name @eq angshu");

```
**Usage "Node"**
```javascript
/*
* Assume that the database "my-db" is created and it holds 1 page named "student" and 3 records as follows
* {name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}
*/

// the following query will return 1 as 1 record is deleted from the "student" page
obj.remove("student", "name @eq angshu");

```
* **5> update**

Update method can be used to update record/records from page of database

| Parameter | Type | Description |
|:-------|:----------:| :------|
| pageName | `String` | Mandetory, The name of the page from where the record/records are going to be deleted, If not provided console error will be thrown|
| queryString | `String` | The query string, Optional, if not provided all of the page data will be replaced by new record value, default "" |
| newRecordValue | `Object` | The new record which will replace the old one |
| backupDatabase | `Boolean` | Optional, control wheather data will be backed up or not , default true |
The function returns a the number of effected rows.

**Usage**
```javascript
/*
* Assume that the database "my-db" is created and it holds 1 page named "student" and 3 records as follows
* {name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}
*/

// the following query will return 1 as 1 record is updated from the "student" page
ldb.update("student", "name @eq angshu", {name: "angshu", age: 30});

``` 
* **6> destroy**

Update method can be used to update record/records from page of database

| Parameter | Type | Description |
|:-------|:----------:| :------|
| databaseName | `String` | Mandetory, The name of the database which will be destroyed|

The function returns true if the destruction successfull, false otherwise
**Usage**
```javascript
/*
* Assume that the database "my-db" is created and it holds 1 page named "student" and 3 records as follows
* {name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}
*/

// the following will return true if the desctruction of database successfull
ldb.destroy("my-db");

```  
### Operator description 
There are two kinds of operators supported in LifeDB
* **Comparison operator**

| Operator | Description |
|:-------|:----------:|
| `@eq` | Equality checking operator|
| `@gt` | Checks the given value is greter than the record value or not|
| `@ge` | Checks the given value is greter than or equal the record value or not|
| `@lt` | Checks the given value is less than the record value or not|
| `@le` | Checks the given value is less than or equal the record value or not|

* **Logical operator**

| Operator | Description |
|:-------|:----------:|
| `&&` | Logical AND operator|
| `||` | Logical OR operator|

### File Description
| File Name | Description |
|:-------|:----------:|
| `life-db-min.js` | The minified version of LifeDB, no comments, uglified code |
| `life-db.js` | With lots of comment indented code |
| `life-db-node.js` | The main file for node environment |
