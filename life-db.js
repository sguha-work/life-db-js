var LifeDB = (function() {
	// private properties
	var databaseName, // holds the name of the database
		insertIntoDataBase, // the first core method to be hitted in time of inserting data to database
		showErrorMessage, // this method display error in console
		errorMessages, // this variables holds all kind of error messagesl
		checkAndSetGlobalStorage, // this method will check wheather sessionStorage is availeble for storing data
		isSessionStorageAvaileble, // If set then session storage is availeble for storing data
		isNodeEnvironment, // If set then the environment is node js
		checkIfNodeEnvironment, // this method set the isNodeEnvironment flag
		globalDataStorage; // if sessionStorage is unavaileble and the environment is not Node then this variable will be used as data storage
	// public properties
	this.initiate;
	this.insert;
	this.update;
	this.query;
	this.remove;

	/**
	* Defining all the error messages with type of the error
	*/
	errorMessages = {
		"dbNameNotSpecified": "Database name mast have to provide in time of initiating the database"
	};

	/**
	* The function responsible for displaying all kind of errors
	* @param {string} errorType - The type of the error
	*/
	showErrorMessage = (function(errorType) {
		console.error(errorMessages[errorType]);
	});

	/**
	* This function checks wheather the environment is Node environment or not
	*/
	checkIfNodeEnvironment = (function() {
		if(this===window) {
			isNodeEnvironment = false;
		} else {
			isNodeEnvironment = true;
		}
	});

	/**
	* This method checks if the sessionStorage is availeble to be used as data storage or not.
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
	* The initiate function can receives 2 arguments
	* @param {string} databaseName - The name of the database
	* @param {Object} data - Optional, The data with which the data base will be initiated
	*
	* Points to remeber the data mast have to follow the following format
	* {
	*	"key1": [{}, {}, {}],
	*	"key2": [{}, {}, {}],
	*	.............
	*   .............
	* }
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
		
	})(arguments);
});