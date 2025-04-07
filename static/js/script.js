let simulationChart;

const chartConfig = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Prey Population',
                borderColor: 'rgba(65, 145, 255, 0.9)',
                backgroundColor: 'rgba(65, 145, 255, 0.08)',
                data: [],
                borderWidth: 1.5,
                pointRadius: 0,
                tension: 0,
                borderDash: [],
                fill: true
            },
            {
                label: 'Predator Population',
                borderColor: 'rgba(255, 65, 65, 0.9)',
                backgroundColor: 'rgba(255, 65, 65, 0.08)',
                data: [],
                borderWidth: 1.5,
                pointRadius: 0,
                tension: 0,
                borderDash: [],
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(255, 255, 255, 0.9)',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Courier New', monospace",
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(30, 30, 30, 0.9)',
                padding: 10,
                titleColor: 'rgba(255, 255, 255, 1)',
                bodyColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1,
                bodyFont: {
                    family: "'Courier New', monospace"
                },
                titleFont: {
                    family: "'Courier New', monospace"
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (t)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    font: {
                        family: "'Courier New', monospace",
                        size: 12,
                        weight: 'normal'
                    }
                },
                grid: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.1)',
                    tickColor: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        family: "'Courier New', monospace",
                        size: 10
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Population (N)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    font: {
                        family: "'Courier New', monospace",
                        size: 12,
                        weight: 'normal'
                    }
                },
                grid: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.1)',
                    tickColor: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        family: "'Courier New', monospace",
                        size: 10
                    }
                }
            }
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart'
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('simulationChart').getContext('2d');
    
    Chart.defaults.color = 'rgba(255, 255, 255, 0.9)';
    Chart.defaults.font.family = "'Courier New', monospace";
    
    simulationChart = new Chart(ctx, chartConfig);
    
    const btn = document.querySelector('button.btn');
    btn.innerHTML = 'Execute Simulation';

    const equationCards = document.querySelectorAll('.equation-card');
    equationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.6)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
});

document.getElementById('simulationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.querySelector('button.btn');
    btn.innerHTML = '<span>Processing...</span>';
    btn.disabled = true;

    const preyCard = document.querySelector('.equation-card.prey');
    const predatorCard = document.querySelector('.equation-card.predator');
    
    preyCard.classList.add('simulating');
    predatorCard.classList.add('simulating');

    const alpha = document.getElementById('alpha').value;
    const beta = document.getElementById('beta').value;
    const gamma = document.getElementById('gamma').value;
    const delta = document.getElementById('delta').value;
    const x0 = document.getElementById('x0').value;
    const y0 = document.getElementById('y0').value;

    fetch('/simulate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `alpha=${alpha}&beta=${beta}&gamma=${gamma}&delta=${delta}&x0=${x0}&y0=${y0}`
    })
    .then(response => response.json())
    .then(data => {
        simulationChart.data.labels = data.time;
        simulationChart.data.datasets[0].data = data.prey;
        simulationChart.data.datasets[1].data = data.predator;
        simulationChart.update();
        
        setTimeout(() => {
            preyCard.classList.remove('simulating');
            predatorCard.classList.remove('simulating');

            highlightEquationTerms(alpha, beta, gamma, delta);
        }, 1000);
        
        btn.innerHTML = 'Execute Simulation';
        btn.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
        btn.innerHTML = 'Error | Retry';
        btn.disabled = false;
        
        preyCard.classList.remove('simulating');
        predatorCard.classList.remove('simulating');
    });
});

function highlightEquationTerms(alpha, beta, gamma, delta) {
    const preyGrowth = document.querySelector('.prey .growth');
    const preyDeath = document.querySelector('.prey .death');
    const predatorGrowth = document.querySelector('.predator .growth');
    const predatorDeath = document.querySelector('.predator .death');
    
    preyGrowth.innerHTML = `Growth rate (α = ${alpha})`;
    preyDeath.innerHTML = `Predation loss (β = ${beta})`;
    predatorGrowth.innerHTML = `Reproduction from predation (δ = ${delta})`;
    predatorDeath.innerHTML = `Natural death (γ = ${gamma})`;
    
    [preyGrowth, preyDeath, predatorGrowth, predatorDeath].forEach(el => {
        el.style.transition = 'color 0.5s ease';
        el.style.color = 'var(--light-color)';
        setTimeout(() => {
            el.style.color = 'var(--gray-400)';
        }, 800);
    });
}
