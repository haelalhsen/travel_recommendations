const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnclear');

btnClear.addEventListener("click",()=>{
    document.getElementById('keyword').value="";
})
btnSearch.addEventListener("click",()=>{
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
        debugger;
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

        if (recomedations.length >0) {
            console.log(recomedations);
            recomedations.forEach(element=>{
                // resultDiv.innerHTML += `<img src="${element.imageUrl}" alt="hjh">`;
                resultDiv.innerHTML += `<h2>${element.name}</h2>`;
            });
        } else {
          resultDiv.innerHTML = '';
          console.log("hiiiii iam here");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
})


function searchRecomendations() {
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
    document.getElementById('keyword').value="";
    // document.getElementById('result').innerHTML ="";
}

// btnSearch.aaddEventListener("click", searchRecomendations);