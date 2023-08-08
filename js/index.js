//! Get Current Location
const successCallback = (position) => {
  display(position.coords.latitude+","+position.coords.longitude);
};

const errorCallback = (error) => {
  display("UK"); // as Defualt
  console.error(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const apiKey = "0a31ec9c1bf54dc9b5f193057233107";
let cards = document.querySelectorAll(".card");
let search = document.querySelector("#search");
const getDate = new Date();

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let todayName, today, month;
let resOutput = {};

search.addEventListener("keyup", function (e) {
  search.value.length > 3 ? display(search.value) : null;
});

async function respone(city) {
    let apiRespone = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4`
  );
  resOutput = await apiRespone.json();  
}

// !Display Cards
async function display(getCity) {
  await respone(getCity);
  const { name, country } = resOutput.location;
  const days = resOutput.forecast.forecastday;
  let daysCondition;
  todayName = getDate.getDay();
  today = getDate.getDate();
  month = getDate.getMonth();
  for (let i = 0; i <= 3; i++) {
    if (todayName > 6) {
      todayName = 0;
    }
    daysCondition = days[i].hour[getDate.getHours()];
    cards[i].innerHTML = `
  <div class="cardHeader d-flex justify-content-between mb-4">
   ${
     i == 0
       ? `<div class="country border border-secondary rounded-3 px-3">${
           name + " , " + country
         }</div>`
       : ""
   }
    ${
      i == 0
        ? `<div class="day">
        ${weekday[todayName++]} ${today++}-${monthNames[month]}</div>`
        : `<div class="day">${weekday[todayName++]}</div>`
    }
    
</div>
<div class="condition d-flex flex-column align-items-center">
    <div class="image mb-2"><img src="${
      i > 0 ? days[i].day.condition.icon : daysCondition.condition.icon
    }" class="img-fluid" alt=""></div>
    <div class="conditionText">${
      i > 0 ? days[i].day.condition.text : daysCondition.condition.text
    }</div>
</div>
<div class="info my-4 d-flex align-items-center">
    <div class="content">
        <div class="contentItem mb-2">
            <i class="fa-solid fa-wind text-secondary pe-2"></i><span class="windKm">
           ${daysCondition.wind_kph} Km/h
            </span>
        </div>
        <div class="contentItem mb-2">
            <i class="fa-solid fa-droplet text-secondary pe-2"></i><span class="dPercent">
            ${daysCondition.humidity}%
            </span>
        </div>
        <div class="contentItem mb-2">
            <i class="fa-solid fa-compass text-secondary pe-2"></i><span class="dirc">
            ${daysCondition.wind_dir}
            </span>
        </div>
    </div>
    <div class="temp ms-auto text-center fw-light">
    <div>${daysCondition.temp_c}°C</div>
    <div class="fs-6">${i > 0 ? days[i].day.mintemp_c + "°" : ""}</div>
    </div>
</div>
  `;
  }
}