// Generated by CoffeeScript 1.3.1
/*
#
# Speedr is Copytight (C) 2012 David Druelinger
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be included
# in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
# OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
# DEALINGS IN THE SOFTWARE.
#
*/

var BaseMap, isArray, isFunction, isObjectLit, mappp, toArrayPairs,
  hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

mappp = {};

isArray = Array.isArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};

isFunction = function(obj) {
  return toString.call(obj) === '[object Function]';
};

isObjectLit = function(obj) {
  if (isArray(obj) || isFunction(obj)) {
    return false;
  }
  return obj === Object(obj);
};

toArrayPairs = function(obj) {
  var k, tempItems, v;
  tempItems = [];
  for (k in obj) {
    v = obj[k];
    tempItems[tempItems.length] = [k, v];
  }
  return tempItems;
};

mappp.binarySearch = function(arr, val, exactMatch) {
  var h, l, m;
  if (exactMatch == null) {
    exactMatch = false;
  }
  h = arr.length;
  l = -1;
  while (h - l > 1) {
    if (arr[m = (h + l) >> 1] > val) {
      l = m;
    } else {
      h = m;
    }
  }
  if (exactMatch) {
    if (arr[h] === val) {
      return h;
    } else {
      return -1;
    }
  } else {
    return h;
  }
};

BaseMap = (function() {

  BaseMap.name = 'BaseMap';

  function BaseMap() {}

  BaseMap.prototype.updateLength = function() {
    this.length = this.keys.length;
    return this.length;
  };

  BaseMap.prototype.each = function(f, start, end, step) {
    var i, k, v, _i;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = this.length;
    }
    if (step == null) {
      step = 1;
    }
    for (i = _i = start; start <= end ? _i < end : _i > end; i = _i += step) {
      k = this.iterKey(i);
      v = this.iterVal(i);
      f(k, v);
    }
    return null;
  };

  BaseMap.prototype.eachKey = function(f, start, end, step) {
    var i, _i;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = this.length;
    }
    if (step == null) {
      step = 1;
    }
    for (i = _i = start; start <= end ? _i < end : _i > end; i = _i += step) {
      f(this.iterKey(i));
    }
    return null;
  };

  // TODO: fix i fro decrementing
  BaseMap.prototype.eachVal = function(f, start, end, step) {
    var i, _i;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = this.length;
    }
    if (step == null) {
      step = 1;
    }
    for (i = _i = start; start <= end ? _i < end : _i > end; i = _i += step) {
      f(this.iterVal(i));
    }
    return null;
  };

  return BaseMap;

})();

mappp.Map = (function(_super) {

  __extends(Map, _super);

  Map.name = 'Map';

  function Map() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.keys = [];
    this.revKeys = {};
    this.items = {};
    this.set.apply(this, items);
    this.updateLength();
  }

  Map.prototype.get = function(key) {
    if (!(key != null)) {
      return null;
    }
    return this.items[key];
  };

  Map.prototype.set = function() {
    var item, items, key, val, _i, _len;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(items[0] != null)) {
      return this.length;
    }
    if (isObjectLit(items[0])) {
      items = toArrayPairs(items[0]);
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (!isArray(item)) {
        throw 'Attempted set of invalid item.';
      }
      key = item[0];
      val = item[1];
      if (!(this.items[key] != null)) {
        this.revKeys[key] = this.keys.length;
        this.keys[this.keys.length] = key;
      }
      this.items[key] = val;
    }
    return this.updateLength();
  };

  Map.prototype.updateRevKeysAfterDeleting = function(position){
    for(var i in this.revKeys){
      if(this.revKeys[i] > position){
        this.revKeys[i]--;
      }
    }
  };

  Map.prototype.removeFastInit = function() {
    this.removedKeysPositions = [];
    this.removedKeysCount = 0;
    return this;
  };

  Map.prototype.removeFastFinish = function() {
    this.removedKeysPositions.sort(function(a, b){return a-b});
    // console.log("[mappp.Map.removeFastFinish]: this.removedKeysPositions: %s", this.removedKeysPositions);

    // console.log("[mappp.Map.removeFastFinish]: this.removedKeysPositions.length: %d, this.removedKeysCount: %d, this.length: %d",
    //   this.removedKeysPositions.length, this.removedKeysCount, this.length);

    // decrement value for each position in the list
    this.removingDecrements = [];

    // build a list of decrements for each position

    var decrement = 0;
    var removedKeysPosition = undefined;
    var removedKeysPositionsCopy = this.removedKeysPositions.slice(0);
    if (removedKeysPositionsCopy.length>0) removedKeysPosition = removedKeysPositionsCopy.shift();
    for (i=0; i<this.keys.length; i++){
      if(removedKeysPosition == i){
        decrement--;
        if (removedKeysPositionsCopy.length>0) removedKeysPosition = removedKeysPositionsCopy.shift();
      }
      this.removingDecrements[i] = decrement;
    }
    // console.log("[mappp.Map.removeFastFinish]: ultimate decrement: %d", decrement);

    // console.log("[mappp.Map.removeFastFinish]: this.keys.length: %d, this.removedKeysPositions[this.removedKeysPositions.length-1]: %s",
    //   this.keys.length, this.removedKeysPositions[this.removedKeysPositions.length-1]);

    // removing keys in reversed order
    for (var i=this.removedKeysPositions.length-1; i>=0; i--){
      var position = this.removedKeysPositions[i];
      this.keys.splice(position, 1);
    }
    // console.log("[mappp.Map.removeFastFinish]: this.keys.length: %d, this.length: %d",
    //   this.keys.length, this.length);

    // updating positions
    for(var i in this.revKeys){
      var position = this.revKeys[i];
      // console.log("[mappp.Map.removeFastFinish]: i: %s, this.revKeys[i]: %d, this.removingDecrements[position]: %d",
      //   i, this.revKeys[i], this.removingDecrements[position]);
      this.revKeys[i] -= this.removingDecrements[position];
      if(this.revKeys[i]<0){
        throw new Error ("For key '"+i+"' position became negative: "+this.revKeys[i]);
      }
    }
    this.updateLength();
    return this;
  };

  Map.prototype.removeFast = function(key) {
    if (!(key != null)) {
      return this.length;
    }
    if (key in this.items) {
      var position = this.revKeys[key];
      this.removedKeysPositions.push(position);
      delete this.revKeys[key];
      delete this.items[key];
      this.removedKeysCount++;
      // item-key from this.keys and positions in this.revKeys will be updated
      // will be removed at the end of removing process
    }
    // TODO: wrong
    this.length = this.keys.length-this.removedKeysPositions.length;
    return this.length;
  };

  Map.prototype.remove = function(key) {
    if (!(key != null)) {
      return this.length;
    }
    if (this.items[key] != null) {
      delete this.items[key];
      var position = this.revKeys[key];
      this.keys.splice(position, 1);
      delete this.revKeys[key];
      // this.updateRevKeysAfterDeleting(position);
    }
    return this.updateLength();
  };

  Map.prototype.iter = function(counter) {
    return [this.keys[counter], this.items[this.keys[counter]]];
  };

  Map.prototype.iterKey = function(counter) {
    return this.keys[counter];
  };

  Map.prototype.iterVal = function(counter) {
    return this.items[this.keys[counter]];
  };

  Map.prototype.hasKey = function(key) {
    return this.items[key] != null;
  };

  Map.prototype.clear = function() {
    this.items = {};
    this.revKeys = {};
    this.keys = [];
    this.updateLength();
    return null;
  };

  return Map;

})(BaseMap);

mappp.SortedMap = (function(_super) {

  __extends(SortedMap, _super);

  SortedMap.name = 'SortedMap';

  function SortedMap() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.keys = [];
    this.vals = [];
    this.set.apply(this, items);
    this.updateLength();
  }

  SortedMap.prototype.get = function(key) {
    var i;
    if (!(key != null)) {
      return null;
    }
    i = mappp.binarySearch(this.keys, key, true);
    if (i === -1) {
      return null;
    }
    return this.vals[i];
  };

  SortedMap.prototype.set = function() {
    var i, item, items, key, val, _i, _len;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(items[0] != null)) {
      return this.length;
    }
    if (isObjectLit(items[0])) {
      items = toArrayPairs(items[0]);
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (!isArray(item)) {
        throw 'Attempted set of invalid item.';
      }
      key = item[0];
      val = item[1];
      i = mappp.binarySearch(this.keys, key);
      if (this.keys[i] === key) {
        this.vals[i] = val;
      } else {
        this.keys.splice(i, 0, key);
        this.vals.splice(i, 0, val);
      }
    }
    return this.updateLength();
  };

  SortedMap.prototype.remove = function(key) {
    var i;
    if (!(key != null)) {
      return this.length;
    }
    i = mappp.binarySearch(this.keys, key);
    this.keys.splice(i, 1);
    this.vals.splice(i, 1);
    return this.updateLength();
  };

  SortedMap.prototype.pop = function() {
    this.keys.pop();
    this.vals.pop();
    return this.updateLength();
  };

  SortedMap.prototype.iter = function(counter) {
    return [this.keys[this.length - 1 - counter], this.vals[this.length - 1 - counter]];
  };

  SortedMap.prototype.iterKey = function(counter) {
    return this.keys[this.length - 1 - counter];
  };

  SortedMap.prototype.iterVal = function(counter) {
    return this.vals[this.length - 1 - counter];
  };

  SortedMap.prototype.hasKey = function(key) {
    if (mappp.binarySearch(this.keys, key, true) === -1) {
      return false;
    } else {
      return true;
    }
  };

  SortedMap.prototype.clear = function() {
    this.keys = [];
    this.vals = [];
    this.updateLength();
    return null;
  };

  return SortedMap;

})(BaseMap);

mappp.SortedMultiMap = (function(_super) {

  __extends(SortedMultiMap, _super);

  SortedMultiMap.name = 'SortedMultiMap';

  function SortedMultiMap() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.keys = [];
    this.vals = [];
    this.insert.apply(this, items);
    this.updateLength();
  }

  SortedMultiMap.prototype.get = function() {
    return null;
  };

  SortedMultiMap.prototype.set = function() {
    return null;
  };

  SortedMultiMap.prototype.insert = function() {
    var i, item, items, key, val, _i, _len;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(items[0] != null)) {
      return this.length;
    }
    if (isObjectLit(items[0])) {
      items = toArrayPairs(items[0]);
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (!isArray(item)) {
        throw 'Attempted insert of invalid item.';
      }
      key = item[0];
      val = item[1];
      i = mappp.binarySearch(this.keys, key);
      this.keys.splice(i, 0, key);
      this.vals.splice(i, 0, val);
    }
    return this.updateLength();
  };

  SortedMultiMap.prototype.remove = function(key, val) {
    var i, j;
    if (!(key != null)) {
      return this.length;
    }
    i = mappp.binarySearch(this.keys, key);
    if (val != null) {
      j = i - 1;
      while (true) {
        if (val === this.vals[i]) {
          break;
        }
        if (val === this.vals[j]) {
          i = j;
          break;
        }
        i++;
        j--;
      }
    }
    this.keys.splice(i, 1);
    this.vals.splice(i, 1);
    return this.updateLength();
  };

  return SortedMultiMap;

})(mappp.SortedMap);

if ((typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null)) {
  module.exports = mappp;
} else {
  window.mappp = mappp;
}
