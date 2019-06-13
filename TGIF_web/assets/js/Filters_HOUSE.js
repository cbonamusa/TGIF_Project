function plusLess() {

  let changes = document.getElementById("plus").getAttribute("class");
  var text = document.getElementById('plus');
  console.log(changes)
  if (changes == "bigplus collapsed") {
    text.innerHTML = "-";
    console.log("hola")

  } else if (changes == "bigplus") {
    text.innerHTML = '+';
  }
}

var mydiv2 = document.querySelector("#jshtmltablelink");

function nulldata(element) {
  if (element == null) {
    return (" ");
  } else {
    return element;
  }
}

var table = `
<table class="table">
<thead >
 <tr>
   <th>Full Name</th>
   
   <th>Party</th>
   <th>State</th>
   <th>Years in Office</th>
   <th>% Votes w/ Party</th>
 </tr>
</thead>
<tbody>`;

for (i = 0; i < dataHouse.results[0].members.length; i++) {
  const rowHTML = `
 <tr>
  <td><a href="${dataHouse.results[0].members[i].url}">
   ${dataHouse.results[0].members[i].first_name + " " +
    nulldata(dataHouse.results[0].members[i].middle_name) + " " +
    dataHouse.results[0].members[i].last_name}</a></td>

   <td>${dataHouse.results[0].members[i].party}</td>
   <td>${dataHouse.results[0].members[i].state}</td>
   <td>${dataHouse.results[0].members[i].seniority}</td>
   <td>${dataHouse.results[0].members[i].votes_with_party_pct + "%"}</td>
 </tr>`

  table += rowHTML;
}

table += '</tbody>'
table += '</table>'

mydiv2.innerHTML = table;
document.getElementById("House-Data").innerHTML = JSON.stringify(dataHouse.results[0].members, null, 2);