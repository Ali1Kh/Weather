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
let todayName = getDate.getDay();
let today = getDate.getDay();
let month = getDate.getMonth();
let resOutput = {};

search.addEventListener("keyup", function (e) {
  search.value.length>3?display(search.value):null;
});

async function respone(city) {
  let apiRespone = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4`
  );
  resOutput = await apiRespone.json();
}

display("Joe Foss Field");

async function display(getCity) {
  await respone(getCity);
  const { name, country } = resOutput.location;
  const currentTemp = resOutput.current.temp_c;
  const days = resOutput.forecast.forecastday;
  let daysCondition;
  for (let i = 0; i <= 3; i++) {
    if (todayName > 6) {
      todayName = 0;
    }
    daysCondition = days[i].hour[i].condition;
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
      i==0
      ? `<div class="day">${weekday[todayName++]} ${today++}-${monthNames[month]}</div>`
      : `<div class="day">${weekday[todayName++]}</div>`
    }
    
</div>
<div class="condition d-flex flex-column align-items-center">
    <div class="image mb-2"><img src="${
      i > 0 ? days[i].day.condition.icon : daysCondition.icon
    }" class="img-fluid" alt=""></div>
    <div class="conditionText">${
      i > 0 ? days[i].day.condition.text : daysCondition.text
    }</div>
</div>
<div class="info my-4 d-flex align-items-center">
    <div class="content">
        <div class="contentItem mb-2">
            <i class="fa-solid fa-wind text-secondary pe-2"></i><span class="windKm">11 Km/h
            </span>
        </div>
        <div class="contentItem mb-2">
            <i class="fa-solid fa-droplet text-secondary pe-2"></i><span class="dPercent">90%
            </span>
        </div>
        <div class="contentItem mb-2">
            <i class="fa-solid fa-compass text-secondary pe-2"></i><span class="dirc">East</span>
        </div>
    </div>
    <div class="temp ms-auto text-center fw-light">
    <div>${i > 0 ? days[i].day.maxtemp_c : currentTemp}°C</div>
    <div class="fs-6">${i > 0 ? days[i].day.mintemp_c + "°" : ""}</div>
    </div>
</div>
  `;
  }
  today=getDate.getDay();
}

