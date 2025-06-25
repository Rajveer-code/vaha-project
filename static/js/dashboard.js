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

async function loadVehicles() {
    try {
        const r = await fetch('/api/vehicles');
        const vehicles = await r.json();
        const tbody = document.querySelector('#vehicles-table tbody');
        tbody.innerHTML = vehicles.map(v => {
            const prev = previousVehicleData.find(p => p.id === v.id);
            let flash = prev && v.daysLeft < prev.daysLeft ? 'flash-update-red' : '';
            return `<tr class="${flash}" id="vrow-${v.id}">
                <td><div style="display:flex;align-items:center;gap:0.75rem;"><div style="font-size:1.5rem;">${v.type==='two-wheeler'?'🏍️':'🚗'}</div><div><div style="font-weight:600;">${v.id}</div><div style="font-size:0.875rem;color:#6b7280;">${v.model}</div></div></div></td>
                <td>${v.owner}</td>
                <td>📍 ${v.location.split(',')[0]}</td>
                <td><span class="badge badge-${v.riskLevel}">${v.riskLevel.toUpperCase()}</span></td>
                <td>🔧 <strong>${v.predictedIssue}</strong></td>
                <td><div style="font-weight:600;color:${v.daysLeft<=7?'#ef4444':v.daysLeft<=20?'#f59e0b':'#10b981'};">${v.daysLeft} days</div></td>
                <td>${Math.round(v.confidence*100)}%</td>
                <td><span class="badge badge-${v.bookingStatus==='confirmed'?'success':'warning'}">${v.bookingStatus}</span></td>
                <td><a href="/vehicle/${v.id}" class="btn btn-primary" style="padding:0.5rem 1rem;font-size:0.875rem;">Details</a></td>
            </tr>`;
        }).join('');
        previousVehicleData = JSON.parse(JSON.stringify(vehicles));
    } catch(e) { console.error(e); }
}
