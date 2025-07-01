// VAHA main utility functions

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', minimumFractionDigits:0 }).format(amount);
}

function countUp(element, target, duration=1000, isDecimal=false) {
    let start = 0;
    const initial = parseFloat(element.textContent);
    if (!isNaN(initial) && initial > 0) start = initial;
    const increment = (target - start) / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if ((increment>0&&current>=target)||(increment<0&&current<=target)) { current=target; clearInterval(timer); }
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }, 16);
}

function showToast(message, type='info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type}`;
    Object.assign(toast.style, {position:'fixed',top:'20px',right:'20px',zIndex:'9999',minWidth:'300px',animation:'slideInRight 0.5s ease'});
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity 0.5s'; setTimeout(()=>toast.remove(),500); }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach((card, i) => {
        setTimeout(() => card.classList.add('fade-in'), i * 100);
    });
});

const _s = document.createElement('style');
_s.textContent = '@keyframes slideInRight{from{opacity:0;transform:translateX(100px);}to{opacity:1;transform:translateX(0);}}';
document.head.appendChild(_s);
