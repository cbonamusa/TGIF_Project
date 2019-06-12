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
var firstTable = document.querySelector("#table1House");

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
var secondTableP = document.querySelector("#table2Houseparty");
var thirdTableP = document.querySelector("#table3Houseparty");

var votes = [];
for (let i = 0; i < dataHouse.results[0].members.length; i++) {
    votes.push(dataHouse.results[0].members[i]);
}

votes.sort(function (a, b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
        return -1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return 1;
    }
    return 0;
});

let top10 = votes.slice(0, votes.length * 0.1);
let bottom10 = votes.reverse().slice(0, votes.length * 0.1);
var lastpart = votes.slice(votes.length*0.1, votes.length)

for ( let i=0; i < lastpart.length ; i++){
    if (lastpart[i].votes_with_party_pct == top10[top10.length-1].votes_with_party_pct) {
      top10.push(lastpart[i]);}}
 
 for ( let i=0; i < lastpart.length ; i++){
   if (lastpart[i].votes_with_party_pct == bottom10[bottom10.length-1].votes_with_party_pct) {
     bottom10.push(lastpart[i]);}}

generatetable(secondTableP, top10);
generatetable(thirdTableP, bottom10);


function generatetable(donde, miembros) {

    var thirdT = `
      <table class="table">
      <thead >
       <tr>
         <th>Name</th> <th>Number of Party Votes</th> <th>% Party Votes</th>
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
        
           <td>${miembros[i].total_votes}</td>
           <td>${miembros[i].votes_with_party_pct + "%"}</td>
         </tr>`

        thirdT += rowHTML;
    }

    thirdT += `</tbody></table>`

    donde.innerHTML = thirdT;

}