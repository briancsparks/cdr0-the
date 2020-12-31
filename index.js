
const _                       = require('underscore');

// var the = global.the = null;

// ====================================================================================================================
// Blatantly stolen from sg

//---------------------------------------------------------------------------------------------------------------------
const isNaN = Number.isNaN || function(value) {
  // NaNs are never equal to themselves, and are the only values that have this weird property
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN

  let n = Number(value);
  return n !== n;
};

//---------------------------------------------------------------------------------------------------------------------
/**
 *  Returns `true` if the item is one of the things in JavaScript that cannot
 *  be manipulated (`null`, `undefined`, `NaN`).
 *
 * @param {*} x
 * @returns true or false
 */
const isnt = function(x) {
  return _.isNull(x) || _.isUndefined(x) || isNaN(x);
};
// ====================================================================================================================



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

