let allCalls = [];

async function loadHeraCalls() {
    const r = await fetch('/api/hera-calls');
    allCalls = await r.json();
    countUp(document.getElementById('total-calls'), allCalls.length);
    const sel = document.getElementById('call-selector');
    sel.innerHTML = allCalls.map((c,i) => `<option value="${i}">${c.vehicle_id} - ${c.owner} (${c.timestamp})</option>`).join('');
    if (allCalls.length > 0) loadCallTranscript(0);
    loadCallLog();
    sel.addEventListener('change', e => loadCallTranscript(parseInt(e.target.value)));
}

function getSentimentBadge(s) {
    if (!s) return '';
    return `<span class="sentiment-badge sentiment-${s}">${s}</span>`;
}

function loadCallTranscript(i) {
    const call = allCalls[i];
    document.getElementById('transcript-container').innerHTML = call.transcript.map(m => `
        <div class="chat-message ${m.speaker==='HERA'?'hera':'user'}">
            <div class="chat-avatar">${m.speaker==='HERA'?'🎙️':'👤'}</div>
            <div class="chat-bubble">
                <div style="font-weight:600;font-size:0.875rem;">${m.speaker}${getSentimentBadge(m.sentiment)}</div>
                <div>${m.text}</div>
                <div class="chat-time">${m.time}</div>
            </div>
        </div>`).join('');
}

function loadCallLog() {
    document.getElementById('call-log-container').innerHTML = allCalls.map(c => `
        <div style="padding:1.5rem;border-bottom:1px solid #e5e7eb;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <div style="display:flex;align-items:center;gap:1rem;">
                    <div style="width:40px;height:40px;background:linear-gradient(135deg,#a855f7,#ec4899);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;">📞</div>
                    <div><div style="font-weight:600;">${c.vehicle_id} - ${c.owner}</div><div style="font-size:0.875rem;color:#6b7280;">${c.timestamp} • ${c.language}</div></div>
                </div>
                <div style="text-align:right;"><span class="badge ${c.outcome==='Confirmed'?'badge-success':'badge-info'}">${c.outcome}</span><div style="font-size:0.875rem;color:#6b7280;margin-top:0.25rem;">${c.duration} • ${c.status}</div></div>
            </div>
        </div>`).join('');
}

document.addEventListener('DOMContentLoaded', loadHeraCalls);
