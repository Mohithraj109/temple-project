let db;

const request = indexedDB.open("TempleDB",3);

request.onupgradeneeded = e=>{
 db = e.target.result;

 if(!db.objectStoreNames.contains("tickets"))
   db.createObjectStore("tickets",{keyPath:"uid"});

 if(!db.objectStoreNames.contains("settings"))
   db.createObjectStore("settings",{keyPath:"key"});

 if(!db.objectStoreNames.contains("types"))
   db.createObjectStore("types",{keyPath:"name"});
};

request.onsuccess = e=>{
 db = e.target.result;
};

function saveTicket(data){
 const tx = db.transaction("tickets","readwrite");
 tx.objectStore("tickets").add(data);
}

function saveSetting(key,value){
 const tx = db.transaction("settings","readwrite");
 tx.objectStore("settings").put({key,value});
}

function getSetting(key,cb){
 const tx = db.transaction("settings","readonly");
 const req = tx.objectStore("settings").get(key);
 req.onsuccess=()=>cb(req.result?.value);
}

function addType(name,price){
 db.transaction("types","readwrite").objectStore("types").put({name,price});
}

function getTypes(cb){
 let arr=[];
 db.transaction("types","readonly").objectStore("types")
 .openCursor().onsuccess=e=>{
   const c=e.target.result;
   if(c){arr.push(c.value);c.continue();}
   else cb(arr);
 };
}

function deleteType(name){
 db.transaction("types","readwrite").objectStore("types").delete(name);
}
