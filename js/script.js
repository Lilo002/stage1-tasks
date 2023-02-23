window.addEventListener('DOMContentLoaded', function() {

    var userLang = navigator.language || navigator.userLanguage; 
    let randomNum = getRandomNum(1, 20);
    const slideNext = document.querySelector('.slide-next'),
          slidePrev = document.querySelector('.slide-prev'),
          body = document.querySelector('body'),
          weatherIcon = document.querySelector('.weather-icon'),
          temperature = document.querySelector('.temperature'),
          weatherDescription = document.querySelector('.weather-description'),
          wind = document.querySelector('.wind'),
          humidity = document.querySelector('.humidity'),
          weatherError = document.querySelector('.weather-error'),
          date = document.querySelector('.date'),
          greetingText = document.querySelector('.greeting'),
          city = document.querySelector('.city'),
          name = document.querySelector('.name');
    
    
    
    function getTime() {
        const date = new Date(),
              currentTime = date.toLocaleTimeString('en-GB'),
              timer = document.querySelector('.time'),
              timeInterval = setInterval(getTime, 1000);
        timer.innerHTML = currentTime;      
    }

    function getFullDate() {
       const options = {
             weekday: 'long',
             month: 'long', 
             day: 'numeric' 
        };

        const now = new Date();

        date.innerHTML = `${now.toLocaleDateString(undefined, options)}`;
    }

    function getGreeting() {
        const date = new Date(),
              hours = date.getHours();
              night = ['Good night', 'Спокойной ночи', 'Дабранач'],
              morning = ['Good morning', 'Доброе утро', 'Добрай раніцы'],
              afternoon = ['Good afternoon', 'Добрый день', 'Добры дзень'],
              evening = ['Good evening', 'Добрый вечер' , 'Добры вечар'],
              timeInterval = setInterval(getGreeting, 1000);
        let index = 0,
            greeting = '';

        if(userLang === 'be') {
            i = 2;
        } else if (userLang === 'ru') {
            i = 1;
        }else {
            i = 0;
        }

        if (hours < 6) {
            greeting = night[i];
        } else if (hours < 12) {
            greeting = morning[i];
        } else if (hours < 18) {
            greeting = afternoon[i];
        } else {
            greeting = evening[i];
        }

        greetingText.innerHTML = `${greeting}, `;
    }
    
    function setLocalStorage() {
        localStorage.setItem('name', name.value);
        localStorage.setItem('city', city.value);
    }

    function getLocalStorageName() {
        if(localStorage.getItem('name')) {
          name.value = localStorage.getItem('name');
        }
    }

    function getLocalStorageCity() {
        if(localStorage.getItem('city')) {
          city.value = localStorage.getItem('city');
        }
    }

    function getTimeOfDay() {
        const date = new Date(),
              hours = date.getHours();
        
        let timeOfDay = '';

        if (hours < 6) {
            timeOfDay = 'nigth';
        } else if (hours < 12) {
            timeOfDay = 'morning';
        } else if (hours < 18) {
            timeOfDay = 'afternoon';
        } else {
            timeOfDay = 'evening';
        }

        return timeOfDay;
    }

    function getRandomNum(min, max) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNum;
    }

    function setBG(num) {
        let randomNumFull = String(num).padStart(2, '0');

        const img = new Image();
        img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNumFull}.jpg`;
        img.onload = () => {
            body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNumFull}.jpg')`;
        };
        
    }
    
    function getSlideNext() {
        if (randomNum < 20) {
            randomNum ++;
            setBG(randomNum);
            return randomNum;
        } else if (randomNum === 20) {
            randomNum = 1;
            setBG(randomNum);
            return randomNum;
        }
    }

    function getSlidePrev() {
        if (randomNum > 1) {
            randomNum --;
            setBG(randomNum);
            return randomNum;
        } else if (randomNum === 1) {
            randomNum = 20;
            setBG(randomNum);
            return randomNum;
        }
    }

    async function getWeather() {
        if (city.value === '' ) {
            city.value = 'Минск';
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${userLang}&appid=0564ff11ab4b00e873094d3ede3976e6&units=metric`,
              res = await fetch(url);
              data = await res.json();

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;

    }

    
    
    
 
    setBG(randomNum);
    getTime();
    getFullDate();
    getGreeting();
    getWeather();
    

    window.addEventListener('load', getLocalStorageName);
    window.addEventListener('load', getLocalStorageCity);
    window.addEventListener('beforeunload', setLocalStorage);
    slideNext.addEventListener('click', getSlideNext);
    slidePrev.addEventListener('click', getSlidePrev);
    city.addEventListener('change', getWeather);
    
});