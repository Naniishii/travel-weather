const API_KEY = '021f221b4f1840d4bb293651250203';
const BASE_URL = 'https://api.weatherapi.com/v1';

async function getWeather() {
    const city = document.getElementById('phCity').value;
    const date = document.getElementById('travelDate').value;

    if (!city) {
        alert('Please select a Philippine city');
        return;
    }

    try {
        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=yes`
        );
        
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        displayWeather(data);
        showBookingSection(city);
        
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function displayWeather(data) {
    const weatherCard = document.getElementById('weatherCard');
    const current = data.current;
    const location = data.location;

    // Update DOM elements
    document.getElementById('location').textContent = `${location.name}, ${location.region}`;
    document.getElementById('temp').textContent = `${current.temp_c}°C`;
    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('precip').textContent = `${current.precip_mm}mm`;
    document.getElementById('uv').textContent = current.uv;
    
    // Weather icon from WeatherAPI
    document.getElementById('weatherIcon').src = `https:${current.condition.icon}`;
    
    weatherCard.classList.remove('hidden');
}

function showBookingSection(city) {
    const bookingSection = document.getElementById('bookingSection');
    document.getElementById('destinationName').textContent = city;
    bookingSection.classList.remove('hidden');
}

// Bonus: Typhoon Alerts
async function getTyphoonAlerts() {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=Manila&alerts=yes`
        );
        const data = await response.json();
        
        if (data.alerts.alert.length > 0) {
            alert('⚠️ Typhoon Alert! Check weather details carefully.');
        }
    } catch (error) {
        console.log('Error fetching alerts:', error);
    }
}

// Initial typhoon check
getTyphoonAlerts();