window.onload = ()=>{

 getSetting("temple",v=>temple.value=v||"My Temple");
 getSetting("adult",v=>adultPrice.value=v||30);

 loadTypes();

}

function loadTypes(){
 getTypes(types=>{
   typesList.innerHTML="";
   types.forEach((t,i)=>{
     const div = document.createElement('div');
     div.style.cssText = 'margin:8px 0;padding:8px;background:white;border-radius:6px;display:flex;justify-content:space-between;align-items:center';
     div.innerHTML = `<span>${t.name} - ₹${t.price}</span>`;
     const btn = document.createElement('button');
     btn.textContent = 'Delete';
     btn.onclick = ()=>removeType(t.name);
     div.appendChild(btn);
     typesList.appendChild(div);
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
 setTimeout(()=>loadTypes(),100);
}

function save(){
 saveSetting("temple",temple.value);
 saveSetting("adult",adultPrice.value);

 alert("Saved");
}
