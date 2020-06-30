

/*
window.addEventListener("load", () => {
    let longitude;
    let latitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let longtitude = position.coords.longitude;
            let latitude = position.coords.latitude;

            const api = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=b8b008d6f3645b497e4478b5f7ae8916`

            fetch()
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(err => alert("Error finding data"))

        }
        )
    };
 */


// on click search for city weather
const forecast = document.getElementById("forecast");
const addForecastPerDay = (list, count) => {
    let averageTempArray = [];
    let averageTemp;
    let minTemp;
    let maxTemp;

    for (let i = count; i < count + 8; i++) {
        console.log(list[i])
        averageTempArray.push(list[i].main.temp)

    }
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

    ${new Date(list[count].dt_txt).toDateString()}
    Average Temp: ${Math.round(averageTemp * 10) / 10} °C
    Lowest: ${Math.round(minTemp * 10) / 10}°C
    Highest: ${Math.round(maxTemp * 10) / 10}°C
    </div>
    `
}




document.getElementById("search-button").addEventListener("click", () => {
    let city = document.getElementById("search-bar").value;
    forecast.innerText = "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b8b008d6f3645b497e4478b5f7ae8916`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather-now").innerHTML = ` Temperature: ${data.main.temp}°C
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt = "${data.weather[0].description}"
        title = "${data.weather[0].main}">
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
            for (let i = 0; i < 4; i++) {
                addForecastPerDay(list, count);
                count += 8;

            }
        })
});