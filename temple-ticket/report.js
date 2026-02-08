window.onload = ()=>{

 const tx = db.transaction("tickets","readonly");
 const store = tx.objectStore("tickets");

 let totalTickets = 0;
 let totalAmount = 0;
 let breakdown = {};

 store.openCursor().onsuccess = e=>{
   const cursor = e.target.result;
   if(cursor){

     const t = cursor.value;

     totalTickets++;
     totalAmount += parseInt(t.total);

     if(t.items){
       t.items.forEach(item=>{
         if(!breakdown[item.name]) breakdown[item.name]=0;
         breakdown[item.name]+=parseInt(item.qty);
       });
     }else{
       if(!breakdown["Adult"]) breakdown["Adult"]=0;
       if(!breakdown["Child"]) breakdown["Child"]=0;
       breakdown["Adult"]+=parseInt(t.adult||0);
       breakdown["Child"]+=parseInt(t.child||0);
     }

     cursor.continue();
   } else {

     let html = "";
     for(let type in breakdown){
       html+=`${type}: ${breakdown[type]}<br>`;
     }

     report.innerHTML = `
     ${html}<br>
     Total Tickets: ${totalTickets}<br>
     TOTAL REVENUE: ₹${totalAmount}
     `;
   }
 };

};

function exportCSV(){

 const tx = db.transaction("tickets","readonly");
 const store = tx.objectStore("tickets");

 let rows = ["TicketID,Date,Adult,Child,Total"];

 store.openCursor().onsuccess = e=>{
   const cursor = e.target.result;

   if(cursor){
     const t = cursor.value;

     rows.push(`${t.uid},${t.date},${t.adult},${t.child},${t.total}`);

     cursor.continue();
   } else {

     const csv = rows.join("\n");
     const blob = new Blob([csv],{type:"text/csv"});
     const url = URL.createObjectURL(blob);

     const a = document.createElement("a");
     a.href = url;
     a.download = "daily_report.csv";
     a.click();

     URL.revokeObjectURL(url);
   }
 };
}

function clearData(){
 if(confirm("Are you sure you want to delete ALL ticket data? This cannot be undone!")){
   const tx = db.transaction("tickets","readwrite");
   const store = tx.objectStore("tickets");
   const req = store.clear();
   
   req.onsuccess = ()=>{
     alert("All data cleared successfully!");
     location.reload();
   };
   
   req.onerror = ()=>{
     alert("Error clearing data!");
   };
 }
}
