var LifeDB = (function() {
	// private properties
	var databaseName, // holds the name of the database
		insertIntoDataBase; // the first core method to be hitted in time of inserting data to database


	// public properties
	this.initiate;
	this.insert;
	this.update;
	this.query;
	this.remove;

	/**
	* The initiate function can receives 2 arguments
	* 1> the database name
	* 2> The data with which the data base will be initiated
	* Points to remeber the data mast have to follow the following format
	* {
	*	"key1": [{}, {}, {}],
	*	"key2": [{}, {}, {}],
	*	.............
	*   .............
	* }
	*/
	this.initiate = (function() {
		databaseName = arguments[0][0];
		alert(databaseName);
		
	})(arguments);
});