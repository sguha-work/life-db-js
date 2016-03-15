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
		filterRecords, // This method filtered the records based on query object provided
		getPageData, // This method returns the total page data
		checkAndFilterWithEqual, // This method filter the recordset with equality checking of key value pare
		applyAndSeparatedQueryOnRecords, // This method apply And separated queries on recordset
		checkDataWithQuery, // This method apply a single query on a single record
		operatorList,// Holds the list of operators used in life-db
		checkEquality, // check equality of attribute and value 
		checkGreterThan, // 
		checkLessThan,
		checkGreterThanEqual,
		checkLessThanEqual;

	// public properties
	this.initiate;
	this.insert;
	this.update;
	this.find;
	this.remove;

	/**
	* @description Defining all the error messages with type of the error
	*/
	errorMessages = {
		"dbNameNotSpecified": "Database name mast have to provide in time of initiating the database",
		"pageNameCannotBeEmpty": "Page name required",
		"pageDoesnotExists": "Provided page doesn't exists"
	};

	/**
	* @description Defining all the error messages with type of the error
	*/
	operatorList = [
		"@eq",
		"@lt",
		"@gt",
		"@le",
		"@ge"
	];

	/**
	* @description Check the equality of values of attribute from record and attribute provided
	* @param data {Object} - A single record
	* @param attributeName {String} - Attribute name from query
	* @param attributeValue {String} - Attribute value from query
	* @returns {Boolean} if the value matches return true, false instead
	*/
	checkEquality = (function(data, attributeName, attributeValue) {
		if(typeof data[attributeName] === "undefined") { // attribute doesn't exists so return false
			return false;
		} else {
			if(JSON.stringify(data[attributeName]) == JSON.stringify(attributeValue)) {
				return true;
			} else {
				return false;
			}	
		}
	});

	/**
	* @description Check the attribute value is greater than the value provided
	* @param data {Object} - A single record
	* @param attributeName {String} - Attribute name from query
	* @param attributeValue {String} - Attribute value from query
	* @returns {Boolean} if the value greter return true, false instead
	*/
	checkGreterThan = (function(data, attributeName, attributeValue) {
		if(typeof data[attributeName] === "undefined") { // attribute doesn't exists so return false
			return false;
		} else {
			if(isNaN(data[attributeName])) { // Value from data is not a number so return false
				return false;
			} else {
				if(data[attributeName] > attributeValue) {
					return true;
				} else {
					return false;
				}		
			}
			
		}
	});

	/**
	* @description Check the attribute value is greater or equal than the value provided
	* @param data {Object} - A single record
	* @param attributeName {String} - Attribute name from query
	* @param attributeValue {String} - Attribute value from query
	* @returns {Boolean} if the value greter or equal return true, false instead
	*/
	checkGreterThanEqual = (function(data, attributeName, attributeValue) {
		if(typeof data[attributeName] === "undefined") { // attribute doesn't exists so return false
			return false;
		} else {
			if(isNaN(data[attributeName])) { // Value from data is not a number so return false
				return false;
			} else {
				if(data[attributeName] >= attributeValue) {
					return true;
				} else {
					return false;
				}		
			}
			
		}
	});

	/**
	* @description Check the attribute value is less than the value provided
	* @param data {Object} - A single record
	* @param attributeName {String} - Attribute name from query
	* @param attributeValue {String} - Attribute value from query
	* @returns {Boolean} if the value less return true, false instead
	*/
	checkLessThan = (function(data, attributeName, attributeValue) {
		if(typeof data[attributeName] === "undefined") { // attribute doesn't exists so return false
			return false;
		} else {
			if(isNaN(data[attributeName])) { // Value from data is not a number so return false
				return false;
			} else {
				if(data[attributeName] < attributeValue) {
					return true;
				} else {
					return false;
				}		
			}
			
		}
	});

	/**
	* @description Check the attribute value is less or equal than the value provided
	* @param data {Object} - A single record
	* @param attributeName {String} - Attribute name from query
	* @param attributeValue {String} - Attribute value from query
	* @returns {Boolean} if the value less or equal return true, false instead
	*/
	checkLessThanEqual = (function(data, attributeName, attributeValue) {
		if(typeof data[attributeName] === "undefined") { // attribute doesn't exists so return false
			return false;
		} else {
			if(isNaN(data[attributeName])) { // Value from data is not a number so return false
				return false;
			} else {
				if(data[attributeName] <= attributeValue) {
					return true;
				} else {
					return false;
				}		
			}
			
		}
	});

	/**
	* @description This method returns the total page data
	* @param pageName {String} - The name of the page where the query will hit
	* @return {Array} - Array of matched records
	*/	
	getPageData = (function(pageName) {
		return globalDataStorage[pageName];
	});

	/**
	* @description This method apply a query on a single record
	* @param data {Object} - A single record
	* @param query {String} - A single query
	* @return {Boolean} True if query matches the record false instead
	*/
	checkDataWithQuery = (function(data, query) {
		var operator,
			operatorIndex,
			splittedQuery;
		for(operatorIndex in operatorList) {
			if(query.indexOf(operatorList[operatorIndex]) !== -1) {
				operator = operatorList[operatorIndex];
				break;
			}
		}
		splittedQuery = query.split(" "+operator+" ");
		// splittedQuery[0] attribute name
		// splittedQuery[1] value
		switch(operator) {
			case "@eq": 
				return checkEquality(data, splittedQuery[0], splittedQuery[1]);
			break;
			case "@gt": 
				return checkGreterThan(data, splittedQuery[0], splittedQuery[1]);
			break;
			case "@lt": 
				return checkLessThan(data, splittedQuery[0], splittedQuery[1]);
			break;
			case "@ge": 
				return checkGreterThanEqual(data, splittedQuery[0], splittedQuery[1]);
			break;
			case "@le": 
				return checkLessThanEqual(data, splittedQuery[0], splittedQuery[1]);
			break;
		}
	});

	/**
	* @description This method apply And separated queries on recordset
	* @param dataArray {Array} - The recordset
	* @param andSeparatedQuery {String} - AND separated query
	* @return {Array} Recordset
	*/
	applyAndSeparatedQueryOnRecords = (function(dataArray, andSeparatedQuery) {
		var queryArray,
			queryIndex,
			dataIndex,
			newDataArray;
		queryArray = andSeparatedQuery.split(" || ");
		newDataArray = [];
		for(dataIndex in dataArray) {
			for(queryIndex in queryArray) {
				if(checkDataWithQuery(dataArray[dataIndex], queryArray[queryIndex])) {
					newDataArray.push(dataArray[dataIndex]);
					break;
				}
			}	
		}
		return newDataArray;	
	});

	/**
	* @description This method chop the record lists by the provided limit
	* @param dataArray {Array} - List of records
	* @param limit {Array} - Array of 2 numbers first the lower limit 2nd the upper limit
	* @return {Array} - Array of chopped records
	*/
	chopDataByLimit = (function(dataArray, limit) {
		var newDataArray,
			dataIndex;
		newDataArray = [];
		for(dataIndex in dataArray) {
			if(dataIndex<limit[0]) {
				continue;
			}
			if(dataIndex>limit[1]) {
				break;
			}
			newDataArray.push(dataArray[dataIndex]);
		}
		return newDataArray;			
	});
	


	/**
	* @description This method sort the data array
	* @param dataArray {Array} - List of records
	* @param sortOrder {String} - The order of the sort
	* @param attributeName {String} - The attribute based on whoose value sort will be performed
	* @return {Array} - Array of sort records
	*/
	sortData = (function(dataArray, sortOrder, attributeName) {
		var newDataArray,
			dataIndex;
		if(sortOrder === "asc") {
			return dataArray.sort(function(a, b) {
			    return (Number(a[attributeName]) - Number(b[attributeName]));
			});		
		} else {
			return dataArray.sort(function(a, b) {
			    return (Number(b[attributeName]) - Number(a[attributeName]));
			});		
		}
		
		
	});
	function  quickSort(dataArray, attributeName, left, right) {
	  var i = left;
	  var j = right;
	  var tmp;
	  pivotidx = (left + right) / 2; 
	  var pivot = parseInt(dataArray[pivotidx.toFixed()][attributeName]);  
	  /* partition */
	  while (i <= j) {
	     while (parseInt(dataArray[i][attributeName]) < pivot) {
	           i++;
	     }
	     while (parseInt(dataArray[j][attributeName]) > pivot) {
	           j--;
	     }
	     if (i <= j) {
	           tmp = dataArray[i];
	           dataArray[i] = dataArray[j];
	           dataArray[j] = tmp;
	           i++;
	           j--;
	     }
	  }

	  /* recursion */
	  if (left < j) {
	        quickSort(dataArray, left, j);
	  }
	  if (i < right) {
	        quickSort(dataArray, i, right);
	  }
		return dataArray;
	}

	/**
	* @description This method filtered the records based on query object provided
	* @param pageName {String} - The name of the page where the query will hit
	* @param queryString {String} - The query string, Optional, if not provided all of the page data will be returned
	* @param limit {Array} - Array of 2 numbers first the lower limit 2nd the upper limit, Optional
	* @param sort {Array} - Array of 2 strings first the attribute name 2nd the direction of sort, Optional
	* @return {Array} - Array of matched records
	*/
	filterRecords = (function(pageName, queryString, limit, sort) {
		var dataArray, 
			andSeparatedQueries,
			indexOfAndSeparatedQueries,
			sortOrder;
		dataArray = getPageData(pageName);
		if(typeof queryString !== "undefined" && queryString.trim() !== "") {
			andSeparatedQueries = queryString.split(" && ");
			for(indexOfAndSeparatedQueries in andSeparatedQueries) {
				dataArray = applyAndSeparatedQueryOnRecords(dataArray, andSeparatedQueries[indexOfAndSeparatedQueries]);
			}
		}
		if(limit[1]!==0) { // if limit is defined
			dataArray = chopDataByLimit(dataArray, limit);
		}
		if(sort[0].trim()!="" && sort[1].trim()!="") {
			sortOrder = sort[1].trim().toLowerCase();
			if(sortOrder=="asc" || sortOrder=="desc") {
				if(dataArray.length >=1 && !isNaN(Number(dataArray[0][sort[0].trim()]))) {
					dataArray = sortData(dataArray, sortOrder, sort[0].trim());
				}
			}
		}
		return dataArray;
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
	* @param backupDatabase {Boolean} - Optional, default true, If true then the program will try to backup the data in session storage or file
	* @return {Number} - The number of effected rows
	*/
	this.insert = (function(pageName, record, backupDatabase) {
		var numberOfEffectedRows;
		numberOfEffectedRows = insertIntoDataBase(pageName, record);
		if(typeof backupDatabase === "undefined" || backupDatabase) {
			backUpData();
		}
		if(!numberOfEffectedRows) {
			return 0; // errorOccured, numberOfEffectedRows 0
		} else {
			return numberOfEffectedRows;
		}
	});

	/**
	* @param pageName {String} - The name of the page where the query will hit
	* @param queryString {String} - The query string, Optional, if not provided all of the page data will be returned
	* @param limit {Array} - Array of 2 numbers first the lower limit 2nd the upper limit, Optional
	* @param sort {Array} - Array of 2 strings first the attribute name 2nd the direction of sort, Optional
	* @return {Array} - Array of matched records
	* @description This public method is called to filtered the records of a page based on query
	*/
	this.find = (function(pageName, queryString, limit, sort) {
		if(pageName.trim() === "") {
			showErrorMessage("pageNameCannotBeEmpty");
			return false;
		} else {
			if(!checkIfPageExists(pageName)) {
				showErrorMessage("pageDoesnotExists");
				return false;
			} else {
				if(typeof limit === "undefined" || !Array.isArray(limit)) {
					limit = [0,0];
				}
				if(typeof sort === "undefined" || !Array.isArray(sort)) {
					sort = ["", ""];
				}
				return filterRecords(pageName, queryString, limit, sort);
			}
		}
	});

	/**
	* @description - This function is used for removing the data from database
	* @param pageName {String} - The name of the page where the query will hit
	* @param queryString {String} - The query string, Optional, if not provided all of the page data will be removed
	* @param backupDatabase {Boolean} - Optional, default true, If true then the program will try to backup the data in session storage or file
	* @return {Number} - The number of effected rows
	*/
	this.remove = (function(pageName, queryString, backupDatabase) {
		if(pageName.trim() === "") {
			showErrorMessage("pageNameCannotBeEmpty");
			return false;
		} else {
			if(!checkIfPageExists(pageName)) {
				showErrorMessage("pageDoesnotExists");
				return false;
			} else {

			}
		}
	});
});