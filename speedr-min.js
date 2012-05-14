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
*/var BaseMap,isArray,isFunction,isObjectLit,speedr,toArrayPairs,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);function ctor(){this.constructor=child}return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child},__slice=[].slice;speedr={},isArray=Array.isArray||function(obj){return toString.call(obj)==="[object Array]"},isFunction=function(obj){return toString.call(obj)==="[object Function]"},isObjectLit=function(obj){return isArray(obj)||isFunction(obj)?!1:obj===Object(obj)},toArrayPairs=function(obj){var k,tempItems,v;tempItems=[];for(k in obj)v=obj[k],tempItems[tempItems.length]=[k,v];return tempItems},speedr.binarySearch=function(arr,val,exactMatch){var h,l,m;exactMatch==null&&(exactMatch=!1),h=arr.length,l=-1;while(h-l>1)arr[m=h+l>>1]>val?l=m:h=m;return exactMatch?arr[h]===val?h:-1:h},BaseMap=function(){BaseMap.name="BaseMap";function BaseMap(){}return BaseMap.prototype.updateLength=function(){return this.length=this.keys.length,this.length},BaseMap.prototype.each=function(f,start,end,step){var i,k,v,_i;start==null&&(start=0),end==null&&(end=this.length),step==null&&(step=1);for(i=_i=start;start<=end?_i<end:_i>end;i=_i+=step)k=this.iterKey(i),v=this.iterVal(i),f(k,v);return null},BaseMap.prototype.eachKey=function(f,start,end,step){var i,_i;start==null&&(start=0),end==null&&(end=this.length),step==null&&(step=1);for(i=_i=start;start<=end?_i<end:_i>end;i=_i+=step)f(this.iterKey(i));return null},BaseMap.prototype.eachVal=function(f,start,end,step){var i,_i;start==null&&(start=0),end==null&&(end=this.length),step==null&&(step=1);for(i=_i=start;start<=end?_i<end:_i>end;i=_i+=step)f(this.iterVal(i));return null},BaseMap}(),speedr.Map=function(_super){__extends(Map,_super),Map.name="Map";function Map(){var items;items=1<=arguments.length?__slice.call(arguments,0):[],this.keys=[],this.revKeys={},this.items={},this.set.apply(this,items),this.updateLength()}return Map.prototype.get=function(key){return key==null?null:this.items[key]},Map.prototype.set=function(){var item,items,key,val,_i,_len;items=1<=arguments.length?__slice.call(arguments,0):[];if(items[0]==null)return this.length;isObjectLit(items[0])&&(items=toArrayPairs(items[0]));for(_i=0,_len=items.length;_i<_len;_i++){item=items[_i];if(!isArray(item))throw"Attempted set of invalid item.";key=item[0],val=item[1],this.items[key]==null&&(this.revKeys[key]=this.keys.length,this.keys[this.keys.length]=key),this.items[key]=val}return this.updateLength()},Map.prototype.remove=function(key){return key==null?this.length:(this.items[key]!=null&&(delete this.items[key],this.keys.splice(this.revKeys[key],1),delete this.revKeys[key]),this.updateLength())},Map.prototype.iter=function(counter){return[this.keys[counter],this.items[this.keys[counter]]]},Map.prototype.iterKey=function(counter){return this.keys[counter]},Map.prototype.iterVal=function(counter){return this.items[this.keys[counter]]},Map.prototype.hasKey=function(key){return this.items[key]!=null},Map.prototype.clear=function(){return this.items={},this.revKeys={},this.keys=[],this.updateLength(),null},Map}(BaseMap),speedr.SortedMap=function(_super){__extends(SortedMap,_super),SortedMap.name="SortedMap";function SortedMap(){var items;items=1<=arguments.length?__slice.call(arguments,0):[],this.keys=[],this.vals=[],this.set.apply(this,items),this.updateLength()}return SortedMap.prototype.get=function(key){var i;return key==null?null:(i=speedr.binarySearch(this.keys,key,!0),i===-1?null:this.vals[i])},SortedMap.prototype.set=function(){var i,item,items,key,val,_i,_len;items=1<=arguments.length?__slice.call(arguments,0):[];if(items[0]==null)return this.length;isObjectLit(items[0])&&(items=toArrayPairs(items[0]));for(_i=0,_len=items.length;_i<_len;_i++){item=items[_i];if(!isArray(item))throw"Attempted set of invalid item.";key=item[0],val=item[1],i=speedr.binarySearch(this.keys,key),this.keys[i]===key?this.vals[i]=val:(this.keys.splice(i,0,key),this.vals.splice(i,0,val))}return this.updateLength()},SortedMap.prototype.remove=function(key){var i;return key==null?this.length:(i=speedr.binarySearch(this.keys,key),this.keys.splice(i,1),this.vals.splice(i,1),this.updateLength())},SortedMap.prototype.pop=function(){return this.keys.pop(),this.vals.pop(),this.updateLength()},SortedMap.prototype.iter=function(counter){return[this.keys[this.length-1-counter],this.vals[this.length-1-counter]]},SortedMap.prototype.iterKey=function(counter){return this.keys[this.length-1-counter]},SortedMap.prototype.iterVal=function(counter){return this.vals[this.length-1-counter]},SortedMap.prototype.hasKey=function(key){return speedr.binarySearch(this.keys,key,!0)===-1?!1:!0},SortedMap.prototype.clear=function(){return this.keys=[],this.vals=[],this.updateLength(),null},SortedMap}(BaseMap),speedr.SortedMultiMap=function(_super){__extends(SortedMultiMap,_super),SortedMultiMap.name="SortedMultiMap";function SortedMultiMap(){var items;items=1<=arguments.length?__slice.call(arguments,0):[],this.keys=[],this.vals=[],this.insert.apply(this,items),this.updateLength()}return SortedMultiMap.prototype.get=function(){return null},SortedMultiMap.prototype.set=function(){return null},SortedMultiMap.prototype.insert=function(){var i,item,items,key,val,_i,_len;items=1<=arguments.length?__slice.call(arguments,0):[];if(items[0]==null)return this.length;isObjectLit(items[0])&&(items=toArrayPairs(items[0]));for(_i=0,_len=items.length;_i<_len;_i++){item=items[_i];if(!isArray(item))throw"Attempted insert of invalid item.";key=item[0],val=item[1],i=speedr.binarySearch(this.keys,key),this.keys.splice(i,0,key),this.vals.splice(i,0,val)}return this.updateLength()},SortedMultiMap.prototype.remove=function(key,val){var i,j;if(key==null)return this.length;i=speedr.binarySearch(this.keys,key);if(val!=null){j=i-1;for(;;){if(val===this.vals[i])break;if(val===this.vals[j]){i=j;break}i++,j--}}return this.keys.splice(i,1),this.vals.splice(i,1),this.updateLength()},SortedMultiMap}(speedr.SortedMap),typeof module!="undefined"&&module!==null&&typeof exports!="undefined"&&exports!==null?module.exports=speedr:window.speedr=speedr;