
const { isnt }                = require('./polyrepo/cdr0-sg');

// var the = global.the = null;

module.exports = function(name, factory) {

  // Initialize it the first time
  if (isnt(global.the)) {
    global.the = {};
  }

  global.the[name] = global.the[name] || noop;    /* Will always return undefined */

  // Update the value once we have a factory fn
  if (global.the[name] === noop && !isnt(factory)) {
    let value = factory();
    global.the[name] = function() {
      return value;
    };
  }

  // Lookup the lookup fn (either the original noop, or the factory-returning one.)
  return function() {
    return global.the[name]();
  };
};

// Will return undefined
function noop(){}
