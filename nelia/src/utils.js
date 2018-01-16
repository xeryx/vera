export function updateObject(obj, key, value) {
   obj[key] = value;
   return obj;
}

export function getUniqueKeyValuesInObjectArray (obj, key) {
   var keyElems = [];
   obj.forEach(function(elem) {
       if(keyElems.indexOf(elem[key]) < 0)  {
           keyElems.push(elem[key]);
       }
   });
   return keyElems;
}

export function getObjectofArraysByUniqueKeyValues (obj, key, keyElems) {
   var returnObject = {};
   for(var i=0; i<keyElems.length;i++) {        
       returnObject[keyElems[i]] = [];
      for(let j=0;j<obj.length;j++) {
           if(obj[j][key]=== keyElems[i])  {
               returnObject[keyElems[i]].push(obj[j]);        
           }
      }
   }        
   return returnObject;  
}

export function geObjectWithKeyValueFromArray(array, key, value) {
   var returnObj = {};
   array.forEach(function(elem) {
       if(elem[key] === value)  {
           returnObj = elem;
       }
   });
   return returnObj;
}