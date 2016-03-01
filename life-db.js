var LifeDB = (function() {
	// private properties
	var databaseName, // Holds the name of the database
		insertIntoDataBase, // The first core method to be hitted in time of inserting data to database
		showErrorMessage, // This method display error in console
		errorMessages, // This variables holds all kind of error messagesl
		checkAndSetGlobalStorage, // This method will check wheather sessionStorage is availeble for storing data
		isSessionStorageAvaileble, // If set then session storage is availeble for storing data
		isNodeEnvironment, // If set then the environment is node js
		checkIfNodeEnvironment, // This method set the isNodeEnvironment flag
		globalDataStorage, // This variable will be used as data storage
		backUpData, // Backup the data in sessionStorage or in file
		checkAndRestoreData, // This method checks if there is any backup exists and restore the data to database
		checkIfPageExists, // This method checks if the page exists or not
		filterRecords; // This method filtered the records based on query object provided
	// public properties
	this.initiate;
	this.insert;
	this.update;
	this.query;
	this.remove;

	/**
	* @description This method filtered the records based on query object provided
	* @param pageName {String} - The name of the page where the query will hit
	* @param queryObject {Object} - The query, Optional, if not provided all of the page data will be returned
	* @return {Array} - Array of matched records
	*/
	filterRecords = (function(pageName, queryObject) {

	});

	/**
	* @description This method checks if the page exists or not
	* @param pageName {String} - The name of the page
	* @returns {Boolean} - Return true if page exists, false instead
	*/
	checkIfPageExists = (function(pageName) {
		if(typeof globalDataStorage[pageName] === "undefined") {
			return false;
		} else {
			return true;
		}
	});

	/**
	* @description This function checks if backup exists or not, if exists then restores the data
	*/
	checkAndRestoreData = (function() {
		var fs;
		if(!isNodeEnvironment && isSessionStorageAvaileble) {
			if(typeof sessionStorage[databaseName] === "undefined") {
				// empty sessionStorage so Restore process ignored
			} else {
				if(sessionStorage[databaseName].trim() !== "") {
					globalDataStorage = JSON.parse(sessionStorage[databaseName]);
				} else {
					// empty sessionStorage so Restore process ignored
				}
			}
		} else if(isNodeEnvironment) {
			fs = require('fs');
			if(fs.statSync(databaseName).isFile()) {
				globalDataStorage = JSON.parse(fs.readFileSync(databaseName));	
			} else {
				// file not exists so Restore process ignored	
			}
		} else {
			// sessionStorage not exists and not a node environment so Restore process ignored
		}
	});

	/**
	* @description This public method is called to insert single or multiple data to a perticuler page
	* @param pageName {String} - The name of the page where the record or records will go
	* @param record {Object/Array} - The data which are going to be inserted in the page
	* @return {Number} - The number of rows effected
	*/
	insertIntoDataBase = (function(pageName, record) {
		var recordIndex;
		try {
			if(typeof globalDataStorage === "undefined") {
				globalDataStorage = {};
			}
			if(typeof globalDataStorage[pageName] === "undefined") {
				globalDataStorage[pageName] = [];
			}
			if(Array.isArray(record)) {
				for(recordIndex in record) {
					globalDataStorage[pageName].push(record[recordIndex]);
				}
				return recordIndex;
			} else {
				globalDataStorage[pageName].push(record);	
				return 1;
			}
		} catch(exception) {
			return 0;
		}
	});
	
	/**
	* @description This function backup the database to sessionStorage if the environment is browser or backup the database in file
	* if the environment is Node
	* 
	*/
	backUpData = (function() {
		var fs;
		if(!isNodeEnvironment && isSessionStorageAvaileble) {
			sessionStorage[databaseName] = JSON.stringify(globalDataStorage);
		} else if(isNodeEnvironment) {
			fs = require('fs');
			fs.writeFileSync(databaseName, JSON.stringify(globalDataStorage));
		} else {
			// ignore backup
		}
	});

	/**
	* @description Defining all the error messages with type of the error
	*/
	errorMessages = {
		"dbNameNotSpecified": "Database name mast have to provide in time of initiating the database",
		"pageNameCannotBeEmpty": "Page name required",
		"pageDoesnotExists": "Provided page doesn't exists"
	};

	/**
	* @description The function responsible for displaying all kind of errors
	* @param {string} errorType - The type of the error
	*/
	showErrorMessage = (function(errorType) {
		console.error(errorMessages[errorType]);
	});

	/**
	* @description This function checks wheather the environment is Node environment or not
	*/
	checkIfNodeEnvironment = (function() {
		if(this===window) {
			isNodeEnvironment = false;
		} else {
			isNodeEnvironment = true;
		}
	});

	/**
	* @description This method checks if the sessionStorage is availeble to be used as data storage or not.
	* If availeble then this method set the flag "isSessionStorageAvaileble" as "true" else "false"
	*/
	checkAndSetGlobalStorage = (function() {
		if(typeof sessionStorage !== "undefined") {
			isSessionStorageAvaileble = true;
			sessionStorage[databaseName] = "";
		} else {
			isSessionStorageAvaileble = false;
		}
	});

	/**
	* @description This function instantiated the database. 
	* @param {string} databaseName - The name of the database
	*/
	this.initiate = (function() {
		if(typeof arguments[0][0] == "undefined") {
			showErrorMessage("dbNameNotSpecified");
			return false;
		} else {
			databaseName = arguments[0][0];
		}
		checkAndSetGlobalStorage();
		checkIfNodeEnvironment();
		checkAndRestoreData();
	})(arguments);

	/**
	* @description This public method is called to insert single or multiple data to a perticuler page
	* @param pageName {String} - The name of the page where the record or records will go
	* @param record {Object/Array} - The data which are going to be inserted in the page
	* @param callBack {Function} - Optional, The callback function which will be called afterthe insert process is complete
	* @param backupDatabase {Boolean} - Optional, default true, If true then the program will try to backup the data in session storage or file
	*/
	this.insert = (function(pageName, record, callBack, backupDatabase) {
		var numberOfEffectedRows;
		numberOfEffectedRows = insertIntoDataBase(pageName, record);
		if(typeof backupDatabase === "undefined" || backupDatabase) {
			backUpData();
		}
		if(!numberOfEffectedRows) {
			callback(true, 0); // errorOccured, numberOfEffectedRows 0
		} else {
			callback(false, numberOfEffectedRows);
		}
	});

	/**
	* @param pageName {String} - The name of the page where the query will hit
	* @param queryObject {Object} - The query, Optional, if not provided all of the page data will be returned
	* @return {Array} - Array of matched records
	* @description This public method is called to filtered the records of a page based on query
	*/
	this.query = (function(pageName, queryObject) {
		if(pageName.trim() === "") {
			showErrorMessage("pageNameCannotBeEmpty");
			return false;
		} else {
			if(!checkIfPageExists(pageName)) {
				showErrorMessage("pageDoesnotExists");
				return false;
			} else {
				return filterRecords(pageName, queryObject);
			}
		}
	});
});