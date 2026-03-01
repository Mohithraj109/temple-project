let ADULT_PRICE = 30;
let TEMPLE = "Temple";
let CUSTOM_TYPES = [];

window.onload = ()=>{
 
 // Wait for DB to be ready
 setTimeout(()=>{
   getSetting("adult",v=>{
    ADULT_PRICE=parseInt(v||30);
    document.getElementById("adultLabel").innerText=ADULT_PRICE;
   });
   getSetting("temple",v=>TEMPLE=v||"Temple");

   getTypes(types=>{
     CUSTOM_TYPES=types;
     renderCustomTypes();
     attachEvents();
   });
 }, 200);
};

function attachEvents(){
 const adultChk = document.getElementById("adultChk");
 const adultQty = document.getElementById("adultQty");
 
 if(adultChk) adultChk.addEventListener("change", calc);
 if(adultQty) adultQty.addEventListener("input", calc);
 
 document.querySelectorAll(".customChk").forEach(chk=>{
   chk.addEventListener("change", calc);
 });
 
 document.querySelectorAll(".customQty").forEach(qty=>{
   qty.addEventListener("input", calc);
 });
}

function renderCustomTypes(){
 const container = document.getElementById("customTypes");
 container.innerHTML="";
 
 CUSTOM_TYPES.forEach(t=>{
   container.innerHTML+=`
   <div class="ticket-row">
   <label><input type="checkbox" class="customChk" data-name="${t.name}" data-price="${t.price}"> ${t.name} (₹${t.price})</label>
   <input type="number" class="customQty" value="0">
   </div>`;
 });
 
 attachEvents();
}

function calc(){
 let total = 0;
 
 const adultChk = document.getElementById("adultChk");
 const adultQty = document.getElementById("adultQty");

 if(adultChk && adultChk.checked){
   total += parseInt(adultQty.value || 0) * ADULT_PRICE;
 }

 document.querySelectorAll(".customChk").forEach((chk,i)=>{
   if(chk.checked){
     let qty = document.querySelectorAll(".customQty")[i].value;
     total += parseInt(qty || 0) * parseInt(chk.dataset.price);
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

 let total = document.getElementById("total").innerText;
 
 if(total == 0 || total == "0"){
   alert("Please select tickets before printing!");
   return;
 }
 
 let items = [];
 
 const adultChk = document.getElementById("adultChk");
 const adultQty = document.getElementById("adultQty");

 if(adultChk && adultChk.checked){
   let qty = parseInt(adultQty.value || 0);
   if(qty > 0) items.push({name:"Person",qty:qty,price:ADULT_PRICE});
 }

 document.querySelectorAll(".customChk").forEach((chk,i)=>{
   if(chk.checked){
     let qty = parseInt(document.querySelectorAll(".customQty")[i].value || 0);
     if(qty>0) items.push({name:chk.dataset.name,qty:qty,price:chk.dataset.price});
   }
 });

 if(items.length === 0){
   alert("Please select tickets before printing!");
   return;
 }

 saveTicket({
   uid:u,
   date:now,
   items:items,
   total:total
 });

 let totalPersons = 0;
 items.forEach(item=>{
   totalPersons += parseInt(item.qty);
 });

 let w = window.open("","PRINT","height=400,width=300");

 w.document.write(`
 <style>
   body {
     font-family: Arial, sans-serif;
     width: 300px;
     margin: 0 auto;
     padding: 20px;
   }
   .ticket-box {
     border: 3px double #000;
     padding: 15px;
     margin: 10px 0;
   }
   .header {
     text-align: center;
     border-bottom: 2px solid #000;
     padding-bottom: 10px;
     margin-bottom: 10px;
   }
   .header h1 {
     margin: 5px 0;
     font-size: 20px;
     font-weight: bold;
   }
   .info-section {
     border: 1px solid #000;
     padding: 10px;
     margin: 10px 0;
     background: #f9f9f9;
   }
   .dashed-line {
     border-top: 2px dashed #000;
     margin: 10px 0;
   }
   .solid-line {
     border-top: 2px solid #000;
     margin: 10px 0;
   }
   .details {
     text-align: center;
     line-height: 1.6;
   }
   .amount-box {
     border: 2px solid #000;
     padding: 10px;
     margin: 10px 0;
     text-align: center;
     background: #fff;
     font-size: 16px;
     font-weight: bold;
   }
   .footer {
     text-align: center;
     font-size: 11px;
     margin-top: 15px;
     padding-top: 10px;
     border-top: 1px dashed #000;
   }
 </style>
 
 <div class="ticket-box">
   <div class="header">
     <h1>NEDUNGUR</h1>
   </div>
   
   <div class="details">
     SRI BALAMURUGAN SRIMATH<br>
     BAMBAN SAMIJI TEMPLE<br>
     SRI MANI SAMIJI'S ASHRAM
   </div>
   
   <div class="dashed-line"></div>
   
   <div class="details">
     NH-AI TRICHY – 621105
   </div>
   
   <div class="solid-line"></div>
   
   <div class="info-section">
     <center><b>MAINTENANCE FEES</b></center>
   </div>
   
   <div class="amount-box">
     PERSONS : ${totalPersons}<br>
     AMOUNT : ₹${total}
   </div>
   
   <div class="dashed-line"></div>
   
   <div class="footer">
     Ticket ID: ${u}<br>
     ${now}<br>
     <div style="margin-top:10px;font-size:10px">Thank you for your visit</div>
   </div>
 </div>
 `);

 w.print();
 w.close();
}
