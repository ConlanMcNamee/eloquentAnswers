'use strict';

var ancestry = require("./ancestry.js");

var letters = [["a", "b"], ["c", "d"], ["e", "f"]];

//a is the final array/starting array that b(the current iteration/array) will then be concatenated into.
var flat = letters.reduce(function(a, b) {
	return a.concat(b);
});

console.log(flat);

//creats an average using the reduce method. 
function average(arr) {
	var reduced = arr.reduce(function(a, b) {
		return a + b;
	});
	return reduced / arr.length;
}
//define a new object that will create propeties based on a persons name
var byName = {};
//use forEach on the ancestery array
ancestry.forEach(function(person) {
	//makeing each byName.person and giving it the property name that is the same as the persons name.
	byName[person.name] = person;
});
//now we can look up a person by their name. 
console.log(byName["Philibert Haverbeke"]);
//console.log(byName);

//here we are going to use filter so that it will remove any values that are null.
var ageDif = ancestry.filter(function(person) {
  return byName[person.mother] != null;
  //immedietly after we are going to call .map which will create an array with 
  //with the age difference between a mother and a child. 
}).map(function(person) {
  return person.born - byName[person.mother].born;
});

//here we use the given avrage function to average the entire array above
console.log(average(ageDif)); 

//groupBy function that takes an array and function as the group argument
function groupBy(arr, group) {
	//empty object
	var groups = {};
	//foreach array method 
	arr.forEach(function(itera) {
		//this will take the group function and pass the above argument 
		//as this argument as well and set it equal to the variable name
		var name = group(itera);
		//if the century exists it will push that iteration to the century
		if(name in groups) {
			groups[name].push(itera);
			//otherwise it will create a new property and set it equal to a new array with that iteration insdie it
		} else {
			groups[name] = [itera];
		}
	});
	//return the object created 
	return groups;
}

//now we take our new groupBy and pass it our ancestry array, and our function to create groups by century
var byCentury = groupBy(ancestry, function(person) {
	return Math.ceil(person.died/100)
});
console.log(byCentury);

//empty object average ages. 
var avgAges = {};

//for each property in the byCentury object 
for(var a in byCentury) {
	//our variable ages is equal to ByCentruy at a, we use the map method 
	//to run a function through each iteration of the array attached to a above
	//which will return an array with the ages at which people died
	var ages = byCentury[a].map(function(person) {
		return person.died - person.born;
	})
	//we then set our object at a equal to the average of our ages
	avgAges[a] = average(ages);
}

console.log(avgAges);


//checked answers for comparison but i came close to the answer
//!tester(array[i[]]) was the part that i didnt quite reach on my own
function every(array, tester) {
	for(var i = 0; i < array.length; i++) {
		if(!tester(array[i])) {
			return false;
		}
	}
	return true;
}

function some(array, tester) {
	for(var i = 0; i < array.length; i++) {
		if(tester(array[i])) {
			return true;
		}
	}
	return false;
}

//just something for testing
var div2 = function(num) {
	if(num % 2 === 0) {
		return true;
	} 
	return false;
}

console.log(every([2, 4, 5], div2));
console.log(every([2, 4, 6], div2));
console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, 3, 4], isNaN));



