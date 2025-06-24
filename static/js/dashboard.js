let previousVehicleData = [];
let fleetHealthChart = null;
let serviceCenterChart = null;

async function loadMetrics() {
    try {
        const r = await fetch('/api/metrics');
        const m = await r.json();
        const c = document.getElementById('metrics-container');
        if (!c.children.length) {
            c.innerHTML = `
                <div class="metric-card" style="background:linear-gradient(135deg,#3b82f6,#2563eb)"><div class="metric-icon">🚗</div><div class="metric-value counting" id="metric-total">0</div><div class="metric-label">Total Fleet</div></div>
                <div class="metric-card" style="background:linear-gradient(135deg,#ef4444,#dc2626)"><div class="metric-icon">⚠️</div><div class="metric-value counting" id="metric-high-risk">0</div><div class="metric-label">High Risk Vehicles</div></div>
                <div class="metric-card" style="background:linear-gradient(135deg,#10b981,#059669)"><div class="metric-icon">📅</div><div class="metric-value counting" id="metric-scheduled">0</div><div class="metric-label">Scheduled Services</div></div>
                <div class="metric-card" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed)"><div class="metric-icon">📈</div><div class="metric-value counting" id="metric-uptime">0.0%</div><div class="metric-label">Fleet Uptime</div></div>`;
            setTimeout(() => {
                countUp(document.getElementById('metric-total'), m.totalVehicles);
                countUp(document.getElementById('metric-high-risk'), m.highRisk);
                countUp(document.getElementById('metric-scheduled'), m.scheduledServices);
                document.getElementById('metric-uptime').textContent = m.avgUptime + '%';
            }, 300);
        } else {
            document.getElementById('metric-total').textContent = m.totalVehicles;
            document.getElementById('metric-high-risk').textContent = m.highRisk;
            document.getElementById('metric-scheduled').textContent = m.scheduledServices;
            document.getElementById('metric-uptime').textContent = m.avgUptime + '%';
        }
    } catch(e) { console.error(e); }
}
document.addEventListener('DOMContentLoaded', () => {
    loadMetrics();
    setInterval(loadMetrics, 5000);
});
