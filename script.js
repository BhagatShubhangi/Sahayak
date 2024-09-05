document.addEventListener('DOMContentLoaded', () => {
    // Initialize map and other interactive features here
});

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('safety-tips-popup');
    const closeButton = document.querySelector('.close-button');
    const safetyTipsContent = document.getElementById('safety-tips-content');

    // Function to show the pop-up with personalized safety tips
    function showSafetyTips(tips) {
        safetyTipsContent.innerText = tips;
        popup.style.display = 'block';
    }

    // Close the pop-up
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Example function to simulate getting personalized tips from AI
    function getPersonalizedSafetyTips(disasterType, location) {
        // Simulate an AI response for demo purposes
        let tips = '';
        if (disasterType === 'flood') {
            tips = "Move to higher ground. Shut off gas valves. Avoid using contaminated water.";
        } else if (disasterType === 'earthquake') {
            tips = "Drop to your hands and knees. Cover your head and neck. Stay indoors.";
        } else if (disasterType === 'fire') {
            tips = "Get out and stay out. Use a wet cloth to cover your nose and mouth. Avoid using elevators.";
        }
        showSafetyTips(tips);
    }

    // Event listener for form submission
    document.getElementById('report-form').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const disasterType = document.getElementById('disaster-type').value;
        const location = 'Simulated Location'; // This should be replaced with actual location data

        // Fetch personalized safety tips based on the report
        getPersonalizedSafetyTips(disasterType, location);
    });
});