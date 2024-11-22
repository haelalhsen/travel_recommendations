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
            alert('ohhhhhh');
            recomedations.forEach(element=>{
                resultDiv.appendChild(createCityCard(
                    element.name,
                    element.description,
                    element.imageUrl,
                    `https://www.google.com/search?query=${element.name}`));
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

function createCityCard(cityName, description, imageUrl, visitUrl) {
  // Create the main card container
  const card = document.createElement('div');
  card.className = 'city-card'; // Add a class for styling

  // Create and append the image
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = `${cityName} image`;
  img.className = 'city-image'; // Add a class for styling
  card.appendChild(img);

  // Create the text container
  const textContainer = document.createElement('div');
  textContainer.className = 'city-text-container';

  // Add the city name
  const cityTitle = document.createElement('h3');
  cityTitle.innerText = cityName;
  textContainer.appendChild(cityTitle);

  // Add the description
  const cityDescription = document.createElement('p');
  cityDescription.innerText = description;
  textContainer.appendChild(cityDescription);

  // Add the "Visit" button
  const visitButton = document.createElement('a');
  visitButton.href = visitUrl;
  visitButton.className = 'visit-button'; // Add a class for styling
  visitButton.innerText = 'Visit';
  textContainer.appendChild(visitButton);

  // Append the text container to the card
  card.appendChild(textContainer);

  return card;
}

