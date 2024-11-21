const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnclear');
btnSearch.aaddEventListener("click", searchRecomendations);
btnClear.aaddEventListener("click", clearRecomendations);

const patients = [];
function addPatient() {
        const name = document.getElementById("name").value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const age = document.getElementById("age").value;
        const condition = document.getElementById("condition").value;

        if (name && gender && age && condition) {
          patients.push({ name, gender: gender.value, age, condition });
          resetForm();
          generateReport();
        }
}

function resetForm() {
        document.getElementById("name").value = "";
        document.querySelector('input[name="gender"]:checked').checked = false;
        document.getElementById("age").value = "";
        document.getElementById("condition").value = "";
}


function searchCondition() {
    const input = document.getElementById('keyword').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const countries=data.countries;
        const beaches=data.beaches;
        const temples=data.temples;
        let recomedations=[];
        
        if(input==="country"){
            countries.forEach(element => {
                element.cities.forEach(city =>{
                    recomedations.push(city);
                })
            });
        }else if(input==="beach"){
            recomedations=beaches;
        }else if(input==="temple"){
            recomedations=temples;
        }else{
            recomedations.concat (temples.find(item => item.name.toLowerCase() === input));
            recomedations.concat ( beaches.find(item => item.name.toLowerCase() === input));
            countries.forEach(element => {
                element.cities.forEach(city =>{
                    if(city===input)
                    recomedations.push(city);
                });
            });
        }

        if (recomedations.lenght >0) {
            recomedations.forEach(element=>{
                // resultDiv.innerHTML += `<img src="${element.imageUrl}" alt="hjh">`;
                resultDiv.innerHTML += `<h2>${element.name}</h2>`;
            });
        } else {
          resultDiv.innerHTML = '';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

function clearRecomendations(){
    const input = document.getElementById('keyword').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    input.value="";
}