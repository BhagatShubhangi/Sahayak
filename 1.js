

function fetchPredictions() {
    // Simulating API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                earthquakeRisk: 'Low',
                floodRisk: 'Moderate',
                hurricaneRisk: 'High',
                disasters: [
                    { type: 'Earthquake', risk: 'Low', lat: 34.0522, lon: -118.2437 },
                    { type: 'Flood', risk: 'Moderate', lat: 29.7604, lon: -95.3698 },
                    { type: 'Hurricane', risk: 'High', lat: 25.7617, lon: -80.1918 }
                ]
            });
        }, 1000);
    });
}

async function updatePredictions() {
    const predictionDetails = document.getElementById('prediction-details');
    predictionDetails.innerHTML = '<p>Loading predictions...</p>';

    try {
        const predictions = await fetchPredictions();
        predictionDetails.innerHTML = `
            <h3>Current Risk Levels:</h3>
            <ul>
                <li>Earthquake: <span class="risk-level ${predictions.earthquakeRisk.toLowerCase()}">${predictions.earthquakeRisk}</span></li>
                <li>Flood: <span class="risk-level ${predictions.floodRisk.toLowerCase()}">${predictions.floodRisk}</span></li>
                <li>Hurricane: <span class="risk-level ${predictions.hurricaneRisk.toLowerCase()}">${predictions.hurricaneRisk}</span></li>
            </ul>
        `;

        if (predictions.hurricaneRisk === 'High') {
            const alert = document.createElement('div');
            alert.className = 'alert';
            alert.innerHTML = '<strong>HIGH HURRICANE RISK:</strong> Please stay tuned for evacuation instructions.';
            predictionDetails.prepend(alert);
        }

        addDisasterMarkers(predictions.disasters);
    } catch (error) {
        predictionDetails.innerHTML = '<p>Error loading predictions. Please try again later.</p>';
    }
}

// ... rest of the JavaScript code ...

function init() {
    initMap();
    updatePredictions();
    updateResponseStrategies();

    // Update predictions and strategies every 5 minutes
    setInterval(() => {
        updatePredictions();
        updateResponseStrategies();
    }, 300000);
}

window.onload = init;

// ... existing code ...

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

async function fetchWeather() {
    // Replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ temp: 22, condition: 'Sunny' });
        }, 500);
    });
}

async function updateWeatherWidget() {
    const weatherWidget = document.getElementById('weather-widget');
    try {
        const weather = await fetchWeather();
        weatherWidget.innerHTML = `${weather.temp}°C | ${weather.condition}`;
    } catch (error) {
        weatherWidget.innerHTML = 'Weather unavailable';
    }
}

function createDisasterChart() {
    const ctx = document.getElementById('disaster-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Number of Disasters',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function init() {
    initMap();
    updatePredictions();
    updateResponseStrategies();
    loadDarkModePreference();
    updateWeatherWidget();
    createDisasterChart();
    AOS.init();

    document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

    // Update predictions, strategies, and weather every 5 minutes
    setInterval(() => {
        updatePredictions();
        updateResponseStrategies();
        updateWeatherWidget();
    }, 300000);
}

window.onload = init;

AOS.init();