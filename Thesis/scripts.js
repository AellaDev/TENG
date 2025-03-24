// Ensure config.js is loaded before this script
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Voltage Chart Setup
const voltageCtx = document.getElementById('voltageChart').getContext('2d');
const voltageChart = new Chart(voltageCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Voltage (V)',
            data: [],
            borderColor: '#2196F3',
            tension: 0.4
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

// Footfall Chart Setup
const footfallCtx = document.getElementById('footfallChart').getContext('2d');
const footfallChart = new Chart(footfallCtx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Footfall Count',
            data: [],
            backgroundColor: '#4CAF50'
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

// Function to Update Dashboard Metrics
function updateDashboard(data) {
    if (!data) return;

    document.getElementById('lastUpdate').textContent = new Date().toLocaleString();

    document.getElementById('voltage').textContent = `${data.voltage || 0} V`;
    document.getElementById('current').textContent = `${data.current || 0} μA`;
    document.getElementById('power').textContent = `${data.power || 0} μW`;
    document.getElementById('totalEnergy').textContent = `${data.totalEnergy || 0} mWh`;
    
    document.getElementById('footfallCount').textContent = `${data.footfallCount || 0}`;
    document.getElementById('energyPerStep').textContent = `${data.energyPerStep || 0} μWh`;
    document.getElementById('footfallRate').textContent = `${data.footfallRate || 0} /min`;

    document.getElementById('batteryVoltage').textContent = `${data.batteryVoltage || 0} V`;
    document.getElementById('storageEfficiency').textContent = `${data.storageEfficiency || 0}%`;

    document.getElementById('dailyEnergy').textContent = `${data.dailyEnergy || 0} mWh`;
    document.getElementById('peakOutput').textContent = `${data.peakOutput || 0} mW`;
    document.getElementById('avgPower').textContent = `${data.avgPower || 0} mW`;
}

// Real-time Data Fetch from Firebase
database.ref('TENG').limitToLast(100).on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        updateDashboard(data);
    }
});
