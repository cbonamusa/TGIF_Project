let datasenate;

getApi();

function getApi(){

  let url = "https://api.propublica.org/congress/v1/113/senate/members.json";
  let myApi = { method: "GET",
                headers: ({
                  'X-API-Key': '6t6gVJAF4QLWDZFDyRumlsNAA9udfjvQtouMvr2R'
                }),
              };

  fetch(url, myApi)
      .then (function(response) {
          return response.json()
  
      })
      .then (function (dataFinal) {
      datasenate = dataFinal;
      console.log(dataFinal);
      fillStates()
      generatetable(datasenate.results[0].members)
     })

      .catch (function(error){
      console.log(error)
  })
}


//Selector
function fillStates(){
  var fullStates = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
  } //Objeto de internet con key (AL) Value (Alabama) para que en la lista salga el Nombre (value)


//  ------------------------ FILTRO 2 (State)
// BOTON DROPDOWN

var myselector = document.querySelector("#selector");
var rutajson = datasenate.results[0].members;

//let uniqueStates = Array.from(new Set(rutajson.map(function (member) { return member.state }).sort())); //returns array ordenada con los estados sin los repetidos
// console.log(uniqueStates)

// Añadir del json los state a la lista de options linkeada en el html:

var lista = [];
for (let i=0; i < rutajson.length;i++){   
  lista.push(rutajson[i].state); 
}
console.log(lista);

// // Eliminamos los repetidos de la lista
var newlist = [];
      for (var i =0; i<lista.length; i++){
          for (var j=0; j<lista.length; j++){
            if (lista[i] !== lista[j] && i!=j && !newlist.includes(lista[i])){
                 newlist.push(lista[i]);
            }
          }
}
newlist.sort(); // la ordenamos alfabeticamente
console.log(newlist);

// // myselector.innerHTML = newlist //Substituimos el contenido que hay en la tag con id=myselector por newlist

for (let i = 0; i < newlist.length; i++) {
  let option = document.createElement("option"); //creamos el tag option de html
  option.setAttribute("value", newlist[i]); //le damos al tag option un value a cada uno
  option.innerHTML = fullStates[newlist[i]]; //Substituimos NY por NuevaYork- fullStates es un objeto, funciona como array entre corchetes ponemos la posicion. fullStates[POSICION en eeste caso la de newlist[i]
  myselector.append(option); //no recuerdo sustitutivo del innerhtml
}
//}

 //AllTheFilters();

//document.getElementById("senate-data").innerHTML=JSON.stringify(datasenate.results[0].members,null,2);


//----------------------------------------------------------FILTER 1 (party R I D) + FILTER 2(State): 

  //document.addEventListener("click", filterarray());
  //document.getElementById("#r").addEventListener("click",filterarray());
}

// Filters
function filterarray() {

  var datolista = document.getElementById("selector").value; console.log(datolista);
  var filterarray = document.querySelectorAll("input[type='checkbox']:checked"); //checked checkboxes
  var dirarray = []; //Array con el "R, I o D  " clicados
  var filtrados = []; //Array con los members que cumplen la condicion - pusheados por el filtro

  
  for (let i = 0; i < filterarray.length; i++) {
   dirarray[i] = filterarray[i].value;
  }

  //filtrar
  for (let i = 0; i < datasenate.results[0].members.length; i++) {
    
      if (   (dirarray.includes(datasenate.results[0].members[i].party) || dirarray.length == 0) 
          && (datasenate.results[0].members[i].state == datolista || datolista == 'All') ) {
        
            filtrados.push(datasenate.results[0].members[i]) //pushear los que coincidan a una nueva array
    }
  }
  generatetable(filtrados);
}


// Function table
function nulldata(element) {
  if (element == null) {
    return (" ");
  } else {
    return element;
  }
}

function generatetable(array) {
  var mydiv = document.querySelector("#divWithTable");
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

  for (var i = 0; i < array.length; i++) {
    let rowHTML = `
     <tr>
      <td><a href="${array[i].url}">
       ${array[i].first_name + " " +
      nulldata(array[i].middle_name) + " " +
      array[i].last_name}</a></td>
    
       <td>${array[i].party}</td>
       <td>${array[i].state}</td>
       <td>${array[i].seniority}</td>
       <td>${array[i].votes_with_party_pct + "%"}</td>
     </tr>`

    table += rowHTML;
  }

  table += '</tbody></table>'

  mydiv.innerHTML = table;
}

