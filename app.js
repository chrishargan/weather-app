
// on click search for city weather
const forecast = document.getElementById("forecast");

function mode(array) {
    if (array.length === 0)
        return null;

    let modeMap = {};
    let maxEL = array[0], maxCount = 1;
    for (let i = 0; i < array.length; i++) {
        let el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEL;
}


const addForecastPerDay = (list, count) => {
    let averageTempArray = [];
    let descriptionArray = [];
    let iconArray = [];
    let averageTemp;
    let minTemp;
    let maxTemp;

    for (let i = count; i < count + 8; i++) {
        console.log(list[i])
        averageTempArray.push(list[i].main.temp)
        descriptionArray.push(list[i].weather[0].description)
        iconArray.push(list[i].weather[0].icon)

    }
    console.log(descriptionArray);
    console.log(iconArray);

    averageTemp = averageTempArray.reduce((prev, curr) => {
        return prev + curr                                              // Average temperature
    }, 8) / 8

    maxTemp = averageTempArray.reduce((prev, curr) => {
        return prev > curr ? prev : curr                           // Max temperature       
    }, 8)

    minTemp = averageTempArray.reduce((prev, curr) => {
        return prev < curr ? prev : curr                         // minimum temperature
    })



    forecast.innerHTML += `
    <div class ="daycast">

    <img src="http://openweathermap.org/img/wn/${mode(iconArray)}@2x.png"
        alt = "${mode(iconArray)}"
        title = "${mode(iconArray)}">
    <h2> ${new Date(list[count].dt_txt).toDateString()} <h2>
   <h2> ${Math.round(averageTemp * 10) / 10} °C </h2>
    <h3> ${Math.round(minTemp * 10) / 10}°C  - ${Math.round(maxTemp * 10) / 10}°C </h3>
    <h3> <i> ${mode(descriptionArray)} </i> </h3>
    </div>
    `


}

document.getElementById("search-button").addEventListener("click", () => {
    let city = document.getElementById("search-bar").value;
    forecast.innerText = "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b8b008d6f3645b497e4478b5f7ae8916`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather-today").innerHTML = `
             <div class="weather-now">
             <h1> Today in </h1>
             <h2> ${city} </h2>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt = "${data.weather[0].description}"
        title = "${data.weather[0].main}">
             <h1> ${data.main.temp}°C </h1>
             </div>
        `
        })
        .catch(err => alert("Error finding data"))

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b8b008d6f3645b497e4478b5f7ae8916`)
        .then(response => response.json())
        .then(data => {
            console.log(data.list)

            let list = data.list
            let today = new Date().toDateString()
            console.log(today)

            let count = 0;
            console.log(new Date(list[count].dt_txt).toDateString())
            while (new Date(list[count].dt_txt).toDateString() === today) {
                console.log(count)
                count++
                list.shift()
                console.log(list)
            }
            for (let i = 0; i < 4; i++) {                            // given the objects are split into 3 hour blocks
                addForecastPerDay(list, count);
                count += 8;

            }
        })

        .then(_ => {
            fetch(`http://api.unsplash.com/search/photos?client_id=yBzycK5C-dNu-34jZg39uzARyxVrE4DOw4ejxdLSszk&page=1&query=${city}`)                      // key is yBzycK5C-dNu-34jZg39uzARyxVrE4DOw4ejxdLSszk
                .then(response => response.json())
                .then(data => {
                    let url = data.results[Math.floor(Math.random() * 10)].urls.regular;
                    document.body.style.backgroundImage = `url(${url})`
                    document.body.style.backgroundPosition = "center"
                    document.body.style.backgroundRepeat = "no-repeat"
                    document.body.style.backgroundSize = "cover"
                })
        })
});





/*

document.getElementById("geo-location").addEventListener("click", () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {


            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude;
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b8b008d6f3645b497e4478b5f7ae8916`

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                        .then(response => response.json())
                        .then(data => {
                            document.getElementById("weather-today").innerHTML = `
             <div class="weather-now">
             <h1> Today in </h1>
             <h2> ${data.main.name} </h2>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt = "${data.weather[0].description}"
        title = "${data.weather[0].main}">
             <h1> ${data.main.temp}°C </h1>
             </div>
        `
                        })

                })
                .catch(err => alert("Error finding data"))

        });
    }
});

*/