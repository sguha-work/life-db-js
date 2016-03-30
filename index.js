var ldb = require('./life-db-node');
var obj = new ldb.LifeDB("my-db");
obj.insert("student", [{name: "angshu", age: 27}, {name: "shyamol", age: 20}, {name: "uttam", age: 30}], false);
console.log(JSON.stringify(obj.find("student", "","",["age", "asc"])));