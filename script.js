const apiKey = 'c50539496181d4ebea918e80f81fe771';
        const openCageApiKey = 'a4ff1da6c1c7464ca313217f35c4c721';

        // Function to fetch weather data
        function fetchWeatherData(lat, lon) {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Handle the weather data here
                    console.log(data);

                    // Display temperature in Celsius
                    const temperature = (data.main.temp - 273.15).toFixed(2);
                    document.body.innerHTML += `<p>Temperature: ${temperature} &#8451;</p>`;

                    // Display other weather data
                    const description = data.weather[0].description;
                    const humidity = data.main.humidity;
                    const pressure = data.main.pressure;

                    document.body.innerHTML += `<p>Description: ${description}</p>`;
                    document.body.innerHTML += `<p>Humidity: ${humidity}%</p>`;
                    document.body.innerHTML += `<p>Pressure: ${pressure} hPa</p>`;
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('There was a problem with the fetch operation:', error);
                });
        }

        // Function to get user's current location
        function getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // Fetch weather data using user's location
                    fetchWeatherData(lat, lon);

                    // Fetch location name using OpenCage Geocoder
                    fetch(`https://api.opencagedata.com/geocode/v1/json?key=${openCageApiKey}&q=${lat}+${lon}`)
                        .then((response) => response.json())
                        .then((data) => {
                            const locationName = data.results[0].formatted;
                            document.getElementById('locationName').innerText = `Location: ${locationName}`;
                        })
                        .catch((error) => {
                            console.error('Error getting location name:', error);
                        });
                }, function (error) {
                    console.error('Error getting user location:', error.message);
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        }

        // Attach a click event handler to the button
        document.getElementById('getLocationButton').addEventListener('click', getCurrentLocation);