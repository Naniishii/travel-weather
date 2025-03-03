const API_KEY = '021f221b4f1840d4bb293651250203';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Initialize date picker
function initDatePicker() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('travelDate').min = today;
    document.getElementById('travelDate').value = today;
}

async function getWeather() {
    const locationInput = document.getElementById('phLocation');
    const city = locationInput.value.trim();
    const date = document.getElementById('travelDate').value;

    if (!city) {
        alert('Please enter a Philippine location');
        return;
    }

    try {
        showLoading(true);
        const response = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)},Philippines&days=3`
        );
        
        if (!response.ok) throw new Error('Location not found in Philippines');
        
        const data = await response.json();
        displayWeather(data);
        showBookingSection(city);
        
    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        showLoading(false);
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
    
    // Weather icon
    document.getElementById('weatherIcon').src = `https:${current.condition.icon}`;
    
    weatherCard.classList.remove('hidden');
}

function showBookingSection(city) {
    const bookingSection = document.getElementById('bookingSection');
    document.getElementById('destinationName').textContent = city;
    bookingSection.classList.remove('hidden');
}

function showLoading(show) {
    document.getElementById('loading').classList.toggle('hidden', !show);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initDatePicker);