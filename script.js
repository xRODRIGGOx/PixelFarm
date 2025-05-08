const farm = document.getElementById('farm');
const coinsEl = document.getElementById('coins');
let coins = 0;

const plots = Array(15).fill().map(() => {
    return { state: 'empty', timer: 0 };
});

function renderFarm() {
    farm.innerHTML = '';
    plots.forEach((plot, index) => {
        const div = document.createElement('div');
        div.className = 'tile';
        if (plot.state === 'growing') div.classList.add('growing');
        if (plot.state === 'ready') div.classList.add('ready');
        div.onclick = () => handleClick(index);
        farm.appendChild(div);
    });
}

function handleClick(index) {
    const plot = plots[index];
    if (plot.state === 'empty') {
        plot.state = 'growing';
        plot.timer = 5; // 5s to grow
    } else if (plot.state === 'ready') {
        coins += 5;
        coinsEl.textContent = coins;
        plot.state = 'empty';
    }
    renderFarm();
}

function updateFarm() {
    plots.forEach(plot => {
        if (plot.state === 'growing') {
            plot.timer -= 1;
            if (plot.timer <= 0) {
                plot.state = 'ready';
            }
        }
    });
    renderFarm();
}

setInterval(updateFarm, 1000);
renderFarm();
