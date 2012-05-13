// Generated by CoffeeScript 1.3.1
var isArray, isObject, speedr,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

speedr = {};

if (typeof document !== "undefined" && document !== null) {
  speedr.ie = (function(){

	    var v = 3,
	        div = document.createElement('div'),
	        all = div.getElementsByTagName('i');

	    while (
	        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
	        all[0]
	    );

	    return v > 4 ? v : false;

	}());;

} else {
  speedr.ie = false;
}

isArray = Array.isArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};

isObject = function(obj) {
  return obj === Object(obj);
};

speedr.getArrays = function(obj) {
  var k, keys, v, vals;
  if (!isObject(obj)) {
    throw new Error('No keys for non-object');
  }
  keys = [];
  vals = [];
  for (k in obj) {
    v = obj[k];
    if (hasOwnProperty.call(obj, k)) {
      keys[keys.length] = k;
      vals[vals.length] = v;
    }
  }
  return [keys, vals];
};

speedr.binarySearch = function(arr, val, exactMatch) {
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

speedr.Map = (function() {

  Map.name = 'Map';

  function Map(items) {
    var junk, _ref;
    this.items = items != null ? items : {};
    if (!isObject(this.items)) {
      throw 'Map requires an object for construction.';
    }
    _ref = speedr.getArrays(this.items), this.keys = _ref[0], junk = _ref[1];
    this.updateLength();
  }

  Map.prototype.updateLength = function() {
    this.length = this.keys.length;
    return this.length;
  };

  Map.prototype.get = function(key) {
    return this.items[key];
  };

  Map.prototype.set = function() {
    var i, key, obj, others, pushPair, val, _i, _ref,
      _this = this;
    obj = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    pushPair = function(key, val) {
      if (!(_this.items[key] != null)) {
        _this.keys.push(key);
      }
      return _this.items[key] = val;
    };
    if (others.length === 0) {
      for (key in obj) {
        val = obj[key];
        pushPair(key, val);
      }
    } else {
      pushPair(obj, others[0]);
      for (i = _i = 1, _ref = others.length; _i < _ref; i = _i += 2) {
        pushPair(others[i], others[i + 1]);
      }
    }
    return this.updateLength();
  };

  Map.prototype.remove = function(key) {
    if (this.items[key] != null) {
      delete this.items[key];
      Array.remove(this.keys, key);
    }
    return this.updateLength();
  };

  Map.prototype.each = function(f) {
    var i, k, v, _i, _ref, _ref1;
    if (!speedr.ie) {
      for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        k = this.iterK(i);
        v = this.iterV(i);
        f(k, v);
      }
    } else {
      _ref1 = this.items;
      for (k in _ref1) {
        v = _ref1[k];
        f(k, v);
      }
    }
    return null;
  };

  Map.prototype.eachKey = function(f) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      f(this.iterK(i));
    }
    return null;
  };

  Map.prototype.eachVal = function(f) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      f(this.iterV(i));
    }
    return null;
  };

  Map.prototype.iter = function(counter) {
    return [this.keys[counter], this.items[this.keys[counter]]];
  };

  Map.prototype.iterK = function(counter) {
    return this.keys[counter];
  };

  Map.prototype.iterV = function(counter) {
    return this.items[this.keys[counter]];
  };

  Map.prototype.hasKey = function(key) {
    return this.items[key] != null;
  };

  Map.prototype.hasVal = function(val) {
    var i, result, _i, _ref;
    result = false;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (val === this.iterV(i)) {
        result = true;
        break;
      }
    }
    return result;
  };

  Map.prototype.clear = function() {
    this.items = {};
    this.keys = [];
    this.updateLength();
    return null;
  };

  return Map;

})();

speedr.MultiMap = (function(_super) {

  __extends(MultiMap, _super);

  MultiMap.name = 'MultiMap';

  function MultiMap() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  }

  return MultiMap;

})(speedr.Map);

speedr.SortedMap = (function() {

  SortedMap.name = 'SortedMap';

  function SortedMap() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.keys = [];
    this.vals = [];
    this.insert.apply(this, items);
    this.updateLength();
  }

  SortedMap.prototype.updateLength = function() {
    this.length = this.keys.length;
    return this.length;
  };

  SortedMap.prototype.get = function(key) {
    var i;
    if (!(key != null)) {
      return null;
    }
    i = speedr.binarySearch(this.keys, key, true);
    if (i === -1) {
      return null;
    }
    return this.vals[i];
  };

  SortedMap.prototype.insert = function() {
    var i, item, items, _i, _len;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(items != null)) {
      return this.length;
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (!isArray(item)) {
        throw 'Attempted insert of invalid item.';
      }
      i = speedr.binarySearch(this.keys, item[0]);
      this.keys.splice(i, 0, item[0]);
      this.vals.splice(i, 0, item[1]);
    }
    return this.updateLength();
  };

  SortedMap.prototype.remove = function(key) {
    var i;
    if (!(key != null)) {
      return this.length;
    }
    i = speedr.binarySearch(this.keys, key);
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

  SortedMap.prototype.iterK = function(counter) {
    return this.keys[this.length - 1 - counter];
  };

  SortedMap.prototype.iterV = function(counter) {
    return this.vals[this.length - 1 - counter];
  };

  SortedMap.prototype.each = function(f) {
    var i, k, v, _i, _ref;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      k = this.iterK(i);
      v = this.iterV(i);
      f(k, v);
    }
    return null;
  };

  SortedMap.prototype.eachKey = function(f) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      f(this.iterK(i));
    }
    return null;
  };

  SortedMap.prototype.eachVal = function(f) {
    var i, _i, _ref;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      f(this.iterV(i));
    }
    return null;
  };

  SortedMap.prototype.hasKey = function(key) {
    if (speedr.binarySearch(this.keys, key, true) === -1) {
      return false;
    } else {
      return true;
    }
  };

  SortedMap.prototype.hasVal = function(val) {
    if (speedr.binarySearch(this.vals, val, true) === -1) {
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

})();

speedr.SortedMultiMap = (function(_super) {

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

  SortedMultiMap.prototype.insert = function() {
    var i, item, items, _i, _len;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (!(items != null)) {
      return this.length;
    }
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (!isArray(item)) {
        throw 'Attempted insert of invalid item.';
      }
      i = speedr.binarySearch(this.keys, item[0]);
      this.keys.splice(i, 0, item[0]);
      this.vals.splice(i, 0, item[1]);
    }
    return this.updateLength();
  };

  SortedMultiMap.prototype.remove = function(key, val) {
    var i, j;
    if (!(key != null)) {
      return this.length;
    }
    i = speedr.binarySearch(this.keys, key);
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

})(speedr.SortedMap);

if ((typeof module !== "undefined" && module !== null) && (typeof exports !== "undefined" && exports !== null)) {
  module.exports = speedr;
} else {
  window.speedr = speedr;
}
