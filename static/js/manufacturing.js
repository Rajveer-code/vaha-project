async function loadManufacturingInsights() {
    try {
        const r = await fetch('/api/manufacturing-insights');
        const insights = await r.json();
        countUp(document.getElementById('active-cases'), insights.length);
        const totalSavings = insights.reduce((s,i) => s + parseFloat(String(i.projected_savings||'₹0L').replace('₹','').replace('L',''))*100000, 0);
        countUp({set textContent(v){document.getElementById('total-savings').textContent='₹'+(v/100000).toFixed(1)+'L';}}, totalSavings);
        document.getElementById('insights-container').innerHTML = insights.map(i => `
            <div style="border:1px solid #e5e7eb;border-radius:0.75rem;padding:1.5rem;margin-bottom:1rem;${i.priority==='High'?'border-left:4px solid #ef4444;':''}">
                <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:1rem;">
                    <div>
                        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
                            <h3 style="font-size:1.25rem;font-weight:700;">${i.component}</h3>
                            <span class="badge ${i.priority==='High'?'badge-danger':'badge-warning'}">${i.priority} Priority</span>
                        </div>
                        <div style="font-size:0.875rem;color:#6b7280;">${i.id} • ${i.frequency} incidents • ${i.affected_vehicles} vehicles</div>
                    </div>
                    <div style="text-align:right;"><div style="font-size:0.875rem;color:#6b7280;">Projected Savings</div><div style="font-size:1.75rem;font-weight:700;color:#10b981;">${i.projected_savings}</div></div>
                </div>
                <div style="padding:1rem;background:#fef3c7;border-radius:0.5rem;margin-bottom:1rem;"><strong>Root Cause:</strong> ${i.root_cause}</div>
                <div style="padding:1rem;background:#d1fae5;border-radius:0.5rem;margin-bottom:1rem;"><strong>Recommendation:</strong> ${i.recommendation}</div>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1rem;">
                    <div><div style="font-size:0.75rem;color:#6b7280;">Supplier</div><div style="font-weight:600;">${i.supplier}</div></div>
                    <div><div style="font-size:0.75rem;color:#6b7280;">Avg RUL</div><div style="font-weight:600;">${(i.avg_rul_km||0).toLocaleString()} km</div></div>
                    <div><div style="font-size:0.75rem;color:#6b7280;">CAPA Ticket</div><div style="font-weight:600;">${i.capa_ticket}</div></div>
                    <div><div style="font-size:0.75rem;color:#6b7280;">Timeline</div><div style="font-weight:600;">${i.timeline}</div></div>
                </div>
                <div style="display:flex;gap:0.75rem;">
                    <button class="btn btn-success" onclick="showToast('Generating CAPA for ${i.id}...','success')">Generate CAPA</button>
                    <button class="btn btn-secondary" onclick="showToast('Opening analysis for ${i.id}...','info')">View Analysis</button>
                </div>
            </div>`).join('');
    } catch(e) { console.error(e); }
}
document.addEventListener('DOMContentLoaded', loadManufacturingInsights);

function generateCAPA(insightId) { showToast(`Generating CAPA for ${insightId}...`,'success'); }
function viewAnalysis(insightId) { showToast(`Opening full analysis for ${insightId}...`,'info'); }
function contactSupplier(code) { showToast(`Initiating supplier contact: ${code}...`,'info'); }
