// Create a function that we can set how much to add by at a later time, for example add(5) will return a function that will enable us to add 5 to whatever number we pass in

var addToThis = function(num1) {

  var addToBase = function(num2) {
    return num1 + num2;
  };

  return addToBase;
}

var add5 = addToThis(5);

add5(3); // 8
add5(1); // 6

// In both cases, add5 remembers that num1 was set equal to 5 when it was invoked
