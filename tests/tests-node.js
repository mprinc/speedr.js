// Generated by CoffeeScript 1.10.0
(function() {
  var STATUS, _, ass, blah, boom, chance, i, j, k, l, len, m, msorty, n, o, p, q, rambo, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, resultLength, results, speedr, t, test, testCount, v;

  speedr = require('../speedr');

  _ = require('underscore');

  STATUS = 'ok';

  testCount = 0;

  test = function(name, result, expected) {
    var i, v;
    if (!_.isEqual(result, expected)) {
      STATUS = 'WITH ERRORS';
      console.log(name + " FAILED");
      console.log("Got:      " + result);
      if (result === Object(result)) {
        console.log((function() {
          var results1;
          results1 = [];
          for (i in result) {
            v = result[i];
            results1.push(i + ": " + v);
          }
          return results1;
        })());
      }
      console.log("Expected: " + expected);
      if (expected === Object(expected)) {
        console.log((function() {
          var results1;
          results1 = [];
          for (i in expected) {
            v = expected[i];
            results1.push(i + ": " + v);
          }
          return results1;
        })());
      }
    }
    return testCount++;
  };

  rambo = function(min, max) {
    var ref;
    if (max == null) {
      ref = [min, 0], max = ref[0], min = ref[1];
    }
    return Math.floor(Math.random() * (max - min) + min);
  };

  chance = function(prob) {
    if (rambo(100) <= 100 - prob - 1) {
      return false;
    } else {
      return true;
    }
  };

  blah = new speedr.Map({
    a: 8,
    b: 9,
    c: 10
  });

  test('Map 1', blah.get('b'), 9);

  blah.set({
    b: 'yoje'
  });

  test('Map 2', blah.items, {
    a: 8,
    b: 'yoje',
    c: 10
  });

  boom = 'BOOM';

  blah.set([boom, 'shakalaka'], ['3', 12]);

  blah.set([boom, 'shakalaka'], ['3', 12]);

  test('Map 3', blah.items, {
    a: 8,
    b: 'yoje',
    c: 10,
    'BOOM': 'shakalaka',
    3: 12
  });

  blah.remove('b');

  test('Map 4', blah.items, {
    a: 8,
    c: 10,
    'BOOM': 'shakalaka',
    3: 12
  });

  blah.each(function(k, v) {
    return test('Map each', (k != null) && (v != null), true);
  });

  ass = {};

  for (i = j = 0, ref = blah.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    ref1 = blah.iter(i), k = ref1[0], v = ref1[1];
    ass[k] = v;
  }

  test('Map 5', ass, blah.items);

  test('Map 6', blah.length, 4);

  msorty = new speedr.SortedMap([420, 'a'], [69, 'b'], [500, 'c'], [123, 'd']);

  resultLength = 4;

  test('SortedMap 1 ', msorty.get(420), 'a');

  test('SortedMap 2 ', msorty.get(69), 'b');

  test('SortedMap 3 ', msorty.hasKey(420), true);

  test('SortedMap 4 ', msorty.hasKey(100), false);

  len = 1000;

  for (i = l = 0, ref2 = len; 0 <= ref2 ? l < ref2 : l > ref2; i = 0 <= ref2 ? ++l : --l) {
    t = rambo(10000000) / rambo(1000);
    if (!msorty.hasKey(t)) {
      resultLength++;
    }
    msorty.set([t, 0]);
    if (chance(5)) {
      msorty.remove(t);
      resultLength--;
    }
    if (chance(5)) {
      if (!msorty.hasKey(t)) {
        resultLength++;
      }
      msorty.set([t, 0]);
    }
  }

  test('SortedMap length', msorty.length, resultLength);

  results = [];

  for (i = m = 0, ref3 = msorty.length; 0 <= ref3 ? m < ref3 : m > ref3; i = 0 <= ref3 ? ++m : --m) {
    results.splice(0, 0, msorty.iterKey(i));
  }

  for (i = n = 0, ref4 = results.length; 0 <= ref4 ? n < ref4 : n > ref4; i = 0 <= ref4 ? ++n : --n) {
    test('SortedMap loop', ((results[i - 1] != null) && !(results[i] <= results[i - 1])) || ((results[i + 1] != null) && !(results[i] >= results[i + 1])), false);
    if (((results[i - 1] != null) && !(results[i] <= results[i - 1])) || ((results[i + 1] != null) && !(results[i] >= results[i + 1]))) {
      console.log("ERROR: " + results[i - 1] + " > " + results[i] + " > " + results[i + 1]);
    }
  }

  msorty.clear();

  test('SortedMap clear', msorty.keys, []);

  test('SortedMap clear', msorty.vals, []);

  msorty = null;

  msorty = new speedr.SortedMultiMap([420, 'a'], [69, 'b'], [500, 'c'], [123, 'd']);

  resultLength = 4;

  test('SortedMultiMap 3 ', msorty.hasKey(420), true);

  test('SortedMultiMap 4 ', msorty.hasKey(100), false);

  len = 1000;

  for (i = o = 0, ref5 = len; 0 <= ref5 ? o < ref5 : o > ref5; i = 0 <= ref5 ? ++o : --o) {
    t = rambo(10000000) / rambo(1000);
    msorty.insert([t, 0]);
    resultLength++;
    if (chance(5)) {
      msorty.remove(t);
      resultLength--;
    }
    if (chance(5)) {
      msorty.insert([t, 0]);
      resultLength++;
    }
  }

  msorty.each(function(k, v) {
    return test('Map each', (k != null) && (v != null), true);
  });

  test('SortedMultiMap length', msorty.length, resultLength);

  results = [];

  for (i = p = 0, ref6 = msorty.length; 0 <= ref6 ? p < ref6 : p > ref6; i = 0 <= ref6 ? ++p : --p) {
    results.splice(0, 0, msorty.iterKey(i));
  }

  for (i = q = 0, ref7 = results.length; 0 <= ref7 ? q < ref7 : q > ref7; i = 0 <= ref7 ? ++q : --q) {
    test('SortedMultiMap loop', ((results[i - 1] != null) && !(results[i] <= results[i - 1])) || ((results[i + 1] != null) && !(results[i] >= results[i + 1])), false);
    if (((results[i - 1] != null) && !(results[i] <= results[i - 1])) || ((results[i + 1] != null) && !(results[i] >= results[i + 1]))) {
      console.log("ERROR: " + results[i - 1] + " > " + results[i] + " > " + results[i + 1]);
    }
  }

  msorty.clear();

  test('SortedMultiMap clear', msorty.keys, []);

  test('SortedMultiMap clear', msorty.vals, []);

  console.log("** " + testCount + " tests completed " + STATUS + " **");

}).call(this);
