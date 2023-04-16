const form = document.querySelector('form');
const cityInput = document.querySelector('#city-input');
const weatherList = document.querySelector('#weather-list');
const fiveDayforecast = document.querySelector('#fivedayforcast');
const apiKey = 'b597f5e5f54657c8bf6c7fabe873a3f3'; // Replace with your own OpenWeatherMap API key

let data;

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  const city = cityInput.value.trim();
  console.log(city)
  localStorage.setItem('city', city);
  let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  let { name, dt, main:{temp,humidity},weather:[{icon}],wind:{speed} } = await (await fetch(url1)).json();
  let forecast = await (await fetch(url2)).json();

  const cityFromStorage = localStorage.getItem('city');
const cityBtns = document.querySelector('#citybtns');
let existingBtn;

// Check if button already exists for this city
for (const btn of cityBtns.querySelectorAll('button')) {
  if (btn.textContent === cityFromStorage) {
    existingBtn = btn;
    break;
  }
}

if (existingBtn) {
  // Use existing button
  existingBtn.addEventListener('click', () => {
    cityInput.value = existingBtn.textContent;
    form.dispatchEvent(new Event('submit')); // trigger form submit event
  });
} else {
  // Create new button
  const li = document.createElement('button');
  li.classList.add('list-group-item');
  li.textContent = cityFromStorage;
  li.addEventListener('click', () => {
    cityInput.value = li.textContent;
    form.dispatchEvent(new Event('submit')); // trigger form submit event
  });
  cityBtns.appendChild(li);
}


currentday.innerHTML = `
    <h1>${name} (${new Date(dt*1000).toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${icon}.png"></h1>
    <h3>Temp: ${temp}</h3>
    <h3>Wind: ${speed}</h3>
    <h3>Humidity: ${humidity}</h3>
  `;

  fiveDayforecast.innerHTML = ''; // Clear the previous forecast cards

  for (let i = 0; i < forecast.list.length; i += 8) {
    const { dt_txt, main:{temp},weather:[{description}],wind:{speed},main:{humidity} } = forecast.list[i];
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title date">${new Date(dt_txt).toLocaleDateString()}</h5>
        <h6 class="card-subtitle mb-2 weather">${description}</h6>
        <p class="card-text temp">Temp: ${temp}</p>
        <p class="card-text wind">Wind: ${speed}</p>
        <p class="card-text humidity">Humidity: ${humidity}</p>
        <img src="https://openweathermap.org/img/w/${forecast.list[i].weather[0].icon}.png" alt="${forecast.list[i].weather[0].description}">
      </div>
    `;
    fiveDayforecast.appendChild(card);
  }

  console.log(forecast);
});
