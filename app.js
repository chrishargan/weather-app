

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

        });

});

    }

*/
document.getElementById("search-button").addEventListener("click", () => {
    let city = document.getElementById("search-bar").value;
    forecast.innerText = "";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b8b008d6f3645b497e4478b5f7ae8916`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather-now").innerText = ` <div> Temperature: ${data.main.temp}°C
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        alt = "${data.weather[0].description}"
        title = "${data.weather[0].main}"
        </div>
        `
        })

});












document.getElementById("search-button").addEventListener("click", () => {
    let city = document.getElementById("search-bar").value;
    forecast.innerText
    let where = document.getElementById("location-city");
    let icon = document.getElementById("icon");
    let description = document.getElementById("temerature-description");
    let tempNow = document.getElementById("temp-Now");

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b8b008d6f3645b497e4478b5f7ae8916`)
        .then(response => {
            return response.json()
        })
        .then(data => {

            console.log(data.list)

            for (let i = 0; i < 8; i++) {


            }



            //console.log(data.list[0].main.temp)
            // while loop through the 5 days checking for the first day how many parts are in the first object as it depends on the time you check, the rest are 8 objects of 3hours each)


            /*
                        let locationValue = data["name"];
                         let tempValue = data.list["list"][0]["main"]["temp"];
                          let descriptionValue = data["weather"][0]["description"];
                          let iconValue = data["weather"][0]["icon"];
              
                          where.innerText = locationValue;
                          description.innerText = descriptionValue;
                          icon.innerText = iconValue;
                          tempNow.innerText = tempValue;
              
              */
        });
    //.catch(error => alert("Please enter City again"));



});


