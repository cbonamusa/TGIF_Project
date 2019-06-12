// //Tabla1: Attendence/PartyLoyalty Senate Number of Representants of each party
var allParty = [];

for (let i = 0; i < dataHouse.results[0].members.length; i++) {
    allParty.push(dataHouse.results[0].members[i].party);
}

var R = [];
var I = [];
var D = [];

for (let i = 0; i < allParty.length; i++) {
    if (allParty[i] === "R") {
        R.push(allParty[i]);
    } else if (allParty[i] === "D") {
        D.push(allParty[i]);
    } else {
        I.push(allParty[i]);
    }
}

// // Average % votes of each partry
var Rpct = 0;
var Ipct = 0;
var Dpct = 0;

for (let i = 0; i < dataHouse.results[0].members.length; i++) {

    if (dataHouse.results[0].members[i].party.includes("R")) {
        Rpct = Rpct + (dataHouse.results[0].members[i].votes_with_party_pct) / R.length; // Es un bucle donde var Rpct se va sobreescribiendo y sumando cada vez el siguiente numero del bucle. Así se van sumando todos. 0 + valor primera ronda, valor primera ronda + valor segunda ronda

    } else if (dataHouse.results[0].members[i].party.includes("D")) {
        Dpct = Dpct + (dataHouse.results[0].members[i].votes_with_party_pct) / D.length;

    } else {
        Ipct = Ipct + (dataHouse.results[0].members[i].votes_with_party_pct) / I.length;
    }
}


// .toFixed(n) acorta a n decimales
var firstTable = document.querySelector("#table1");


var firstT = `
      <table class="table">
      <thead >
       <tr>
         <th>Party</th>      
         <th>N. of Reps</th>
         <th>% Voted w/Party</th>
       </tr>

      </thead>
      <tbody>
        <tr>
           <td>Republicans</td> <td>${R.length}</td> <td>${Rpct.toFixed(2) + "%"}</td> 
        </tr>

        <tr>
          <td>Democrats</td> <td>${D.length}</td> <td>${Dpct.toFixed(2) + "%"}</td>
       </tr>

       <tr>
         <td>Independents</td> <td>${I.length}</td> <td>${Ipct.toFixed(2) + "%"}</td>
       </tr>

       <tr>
        <td>Total</td>  <td>${I.length + D.length + R.length}</td> <td>${((Ipct + Dpct + Rpct) / 3).toFixed(2) + "%"}</td>
       </tr>`

firstTable.innerHTML = firstT;



// // Tabla 2 i 3:  Least  and MoreEnganged Attendence : Senate 
var secondTable = document.querySelector("#table2");
var thirdTable = document.querySelector("#table3");
var missed = [];
for (let i = 0; i < dataHouse.results[0].members.length; i++) {
    missed.push(dataHouse.results[0].members[i]);
}

missed.sort(function (a, b) {
    if (a.missed_votes_pct < b.missed_votes_pct) {
        return -1;
    }
    if (a.missed_votes_pct > b.missed_votes_pct) {
        return 1;
    }
    return 0;
});

let top10 = missed.slice(0, missed.length * 0.1);
let bottom10 = missed.reverse().slice(0, missed.length * 0.1);

var lastpart = missed.slice(missed.length*0.1, missed.length) // trozo de la array que va del 10% hasta el final


for ( let i=0; i < lastpart.length ; i++){
   if (lastpart[i].missed_votes_pct == top10[top10.length-1].missed_votes_pct) {
     top10.push(lastpart[i]);}}

for ( let i=0; i < lastpart.length ; i++){
  if (lastpart[i].missed_votes_pct == bottom10[bottom10.length-1].missed_votes_pct) {
    bottom10.push(lastpart[i]);}}

    
  //for( let i=0; i<missed.length; i++){
    //if (i>= missed.length*0.1){
      //if (missed[(missed.length*0.1)-1].total_votes === missed[i].total_votes){
        //top10 += missed;
      //}
    //}
  //}

console.log(top10);
generatetable(secondTable, top10);
generatetable(thirdTable, bottom10);

function generatetable(donde, miembros) {

    var secondT = `
      <table class="table">
      <thead >
       <tr>
         <th>Name</th> <th>Number of Missed Votes</th> <th>% Missed</th>
       </tr>
      </thead>
      <tbody>`

    for (var i = 0; i < miembros.length; i++) {
        let rowHTML = `
         <tr>
          <td><a href="${miembros[i].url}">
           ${miembros[i].first_name + " " +
            (miembros[i].middle_name || "") + " " +
            miembros[i].last_name}</a></td>
        
           <td>${miembros[i].missed_votes}</td>
           <td>${miembros[i].missed_votes_pct + "%"}</td>
         </tr>`

        secondT += rowHTML;
    }

    secondT += `</tbody></table>`

    donde.innerHTML = secondT;

}


