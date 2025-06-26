let allVehicles = [];

async function loadAllVehicles() {
    const r = await fetch('/api/vehicles');
    allVehicles = await r.json();
    displayVehicles(allVehicles);
}

function displayVehicles(vehicles) {
    const c = document.getElementById('vehicles-grid');
    c.innerHTML = vehicles.map(v => `
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:1rem;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <div style="font-size:3rem;">${v.type==='two-wheeler'?'🏍️':'🚗'}</div>
                    <div><h3 style="font-size:1.125rem;">${v.model}</h3><p style="font-size:0.875rem;color:#6b7280;">${v.id}</p></div>
                </div>
                <span class="badge badge-${v.riskLevel}">${v.riskLevel.toUpperCase()}</span>
            </div>
            <div style="padding:1rem;background:#f9fafb;border-radius:0.5rem;margin-bottom:1rem;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;font-size:0.875rem;">
                    <div><div style="color:#6b7280;">Owner</div><div style="font-weight:600;">${v.owner}</div></div>
                    <div><div style="color:#6b7280;">Location</div><div style="font-weight:600;">${v.location.split(',')[0]}</div></div>
                    <div><div style="color:#6b7280;">Mileage</div><div style="font-weight:600;">${v.mileage.toLocaleString()} km</div></div>
                    <div><div style="color:#6b7280;">Days to Service</div><div style="font-weight:600;color:${v.daysLeft<=7?'#ef4444':'#10b981'};">${v.daysLeft} days</div></div>
                </div>
            </div>
            <div style="margin-bottom:1rem;"><div style="font-size:0.875rem;color:#6b7280;margin-bottom:0.5rem;">Predicted Issue</div><div style="font-weight:600;">🔧 ${v.predictedIssue} <span style="font-size:0.75rem;color:#6b7280;">(${Math.round(v.confidence*100)}% confidence)</span></div></div>
            <div style="display:flex;gap:0.5rem;"><a href="/vehicle/${v.id}" class="btn btn-primary" style="flex:1;">View Details</a></div>
        </div>`).join('');
}

function filterVehicles() {
    const s = document.getElementById('search').value.toLowerCase();
    const r = document.getElementById('risk-filter').value;
    const t = document.getElementById('type-filter').value;
    displayVehicles(allVehicles.filter(v =>
        (!s || v.id.toLowerCase().includes(s) || v.owner.toLowerCase().includes(s) || v.location.toLowerCase().includes(s)) &&
        (!r || v.riskLevel===r) && (!t || v.type===t)
    ));
}

document.addEventListener('DOMContentLoaded', () => {
    loadAllVehicles();
    document.getElementById('search').addEventListener('input', filterVehicles);
    document.getElementById('risk-filter').addEventListener('change', filterVehicles);
    document.getElementById('type-filter').addEventListener('change', filterVehicles);
});
