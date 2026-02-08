window.onload = ()=>{

 getSetting("temple",v=>temple.value=v||"My Temple");
 getSetting("adult",v=>adultPrice.value=v||100);
 getSetting("child",v=>childPrice.value=v||50);

 loadTypes();

}

function loadTypes(){
 getTypes(types=>{
   typesList.innerHTML="";
   types.forEach(t=>{
     typesList.innerHTML+=`<div style="margin:8px 0;padding:8px;background:white;border-radius:6px">${t.name} - ₹${t.price} <button onclick="removeType('${t.name}')">Delete</button></div>`;
   });
 });
}

function addNewType(){
 if(typeName.value && typePrice.value){
   addType(typeName.value,typePrice.value);
   typeName.value="";
   typePrice.value="";
   loadTypes();
 }
}

function removeType(name){
 deleteType(name);
 loadTypes();
}

function save(){
 saveSetting("temple",temple.value);
 saveSetting("adult",adultPrice.value);
 saveSetting("child",childPrice.value);

 alert("Saved");
}
