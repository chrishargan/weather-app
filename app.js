

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

    let where = document.getElementById("location-city");
    let icon = document.getElementById("icon");
    let description = document.getElementById("temerature-description");
    let tempNow = document.getElementById("temp-Now");

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b8b008d6f3645b497e4478b5f7ae8916`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)

            /*
                        let locationValue = data["name"];
                        let tempValue = data["list"][0]["main"]["temp"];
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


