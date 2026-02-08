let ADULT_PRICE = 100;
let CHILD_PRICE = 50;
let TEMPLE = "Temple";
let CUSTOM_TYPES = [];

window.onload = ()=>{
 getSetting("adult",v=>{
  ADULT_PRICE=parseInt(v||100);
  document.getElementById("adultLabel").innerText=ADULT_PRICE;
 });
 getSetting("child",v=>{
  CHILD_PRICE=parseInt(v||50);
  document.getElementById("childLabel").innerText=CHILD_PRICE;
 });
 getSetting("temple",v=>TEMPLE=v||"Temple");

 getTypes(types=>{
   CUSTOM_TYPES=types;
   renderCustomTypes();
 });
};

function renderCustomTypes(){
 customTypes.innerHTML="";
 CUSTOM_TYPES.forEach(t=>{
   customTypes.innerHTML+=`
   <div class="ticket-row">
   <label><input type="checkbox" class="customChk" data-name="${t.name}" data-price="${t.price}"> ${t.name} (₹${t.price})</label>
   <input type="number" class="customQty" value="0">
   </div>`;
 });
 document.querySelectorAll("input").forEach(i=>i.oninput=calc);
}

document.querySelectorAll("input").forEach(i=>{
 i.oninput = calc;
});

function calc(){
 let total = 0;

 if(adultChk.checked)
 total += adultQty.value * ADULT_PRICE;

 if(childChk.checked)
 total += childQty.value * CHILD_PRICE;

 document.querySelectorAll(".customChk").forEach((chk,i)=>{
   if(chk.checked){
     let qty = document.querySelectorAll(".customQty")[i].value;
     total += qty * chk.dataset.price;
   }
 });

 document.getElementById("total").innerText = total;
}

function uid(){
 return crypto.randomUUID().slice(0,8).toUpperCase();
}

function printTicket(){

 let u = uid();
 let now = new Date().toLocaleString();

 let a = adultChk.checked ? adultQty.value : 0;
 let c = childChk.checked ? childQty.value : 0;

 let total = document.getElementById("total").innerText;
 let items = [];

 if(a>0) items.push({name:"Adult",qty:a,price:ADULT_PRICE});
 if(c>0) items.push({name:"Child",qty:c,price:CHILD_PRICE});

 document.querySelectorAll(".customChk").forEach((chk,i)=>{
   if(chk.checked){
     let qty = document.querySelectorAll(".customQty")[i].value;
     if(qty>0) items.push({name:chk.dataset.name,qty:qty,price:chk.dataset.price});
   }
 });

 saveTicket({
   uid:u,
   date:now,
   items:items,
   total:total
 });

 let w = window.open("","PRINT","height=400,width=300");

 w.document.write(`
 <style>
 body{font-family:Arial;text-align:center}
 hr{border:none;border-top:1px dashed #000}
 </style>

 <b>${TEMPLE}</b><br>
 <hr>
 ID: ${u}<br>
 ${now}<br>
 <hr>
 `);

 items.forEach(item=>{
   w.document.write(`${item.name} x${item.qty} = ₹${item.qty*item.price}<br>`);
 });

 w.document.write(`
 <hr>
 <b>TOTAL: ₹${total}</b><br><br>
 Thank you
 `);

 w.print();
 w.close();
}
