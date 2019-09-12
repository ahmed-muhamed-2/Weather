window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
  const apiCode = '68dbfa445f585e97f70b4ba88553e541';
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `${proxy}https://api.darksky.net/forecast/${apiCode}/${lat},${long}`;

      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(response => {
          const { temperature, summary, icon } = response.currently;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = response.timezone;
          setIcon(icon);
          let celsius = (temperature - 32) * (5 / 9);

          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
  function setIcon(icon) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.add(document.getElementById('weather-icon'), currentIcon);
    skycons.play();
  }
});
