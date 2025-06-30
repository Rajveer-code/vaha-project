async function loadUEBAAlerts() {
    try {
        const r = await fetch('/api/ueba-alerts');
        const alerts = await r.json();
        countUp(document.getElementById('critical-alerts'), alerts.filter(a=>a.severity==='Critical'&&a.status==='Blocked').length);
        countUp(document.getElementById('agent-actions'), 1247);
        document.getElementById('alerts-container').innerHTML = alerts.map(a => {
            const isActionable = a.actionable && (a.status==='Blocked'||a.status==='Monitored');
            return `<div class="alert ${a.severity==='Critical'?'alert-danger':'alert-warning'}" id="alert-${a.id}">
                <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:1rem;">
                    <div><h4 style="font-size:1.125rem;margin-bottom:0.5rem;">${a.action}</h4><p style="font-size:0.875rem;color:#6b7280;"><strong>Agent:</strong> ${a.agent} (${a.agent_id}) • <strong>Time:</strong> ${a.timestamp}</p></div>
                    <span class="badge ${a.severity==='Critical'?'badge-danger':'badge-warning'}">${a.severity}</span>
                </div>
                <p style="margin-bottom:1rem;"><strong>Details:</strong> ${a.details}</p>
                <p style="margin-bottom:1rem;"><strong>Response:</strong> <span id="response-${a.id}">${a.response}</span></p>
                <div style="display:flex;gap:0.5rem;" id="actions-${a.id}">
                    ${isActionable?`<button class="btn btn-danger" onclick="handleUebaAction('${a.id}','quarantine')">🔒 Quarantine Agent</button><button class="btn btn-secondary" onclick="handleUebaAction('${a.id}','dismiss')">✅ Dismiss Alert</button>`:''}
                </div>
            </div>`;
        }).join('');
    } catch(e) { console.error(e); }
}

async function handleUebaAction(alertId, action) {
    const r = await fetch('/api/ueba-action', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({alert_id:alertId,action:action})});
    const result = await r.json();
    if (result.success) {
        showToast(result.message, action==='quarantine'?'danger':'success');
        document.getElementById(`actions-${alertId}`).innerHTML = `<span class="badge ${action==='quarantine'?'badge-danger':'badge-info'}">STATUS: ${action.toUpperCase()}D</span>`;
    }
}

document.addEventListener('DOMContentLoaded', loadUEBAAlerts);
