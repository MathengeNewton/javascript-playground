// By returning an object we are able to preserve multiple methods inside of it

function counter() {
  var n = 0;

  return {
    count: function() { return ++n; },
    reset: function() { n = 0; }
  }
}

var myCounter = counter();

myCounter.count(); // n = 1
myCounter['count'](); // n = 2

myCounter.reset(); // n reset to 0
