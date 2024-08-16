const apiUrl1 = 'https://solusiadil-api.vercel.app/konsultasi';
const apiUrl2 = 'https://solusiadil-api.vercel.app/blogs';
const apiUrlBerita = 'https://solusiadil-api.vercel.app/berita';

async function fetchChartData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function createChart(apiUrl, ctx, labels, backgroundColors) {
    const data = await fetchChartData(apiUrl);
    if (!data) return;
    const statusCounts = labels.reduce((acc, label) => {
        acc[label.toLowerCase()] = 0;
        return acc;
    }, {});
    Object.values(data).forEach(item => {
        if (statusCounts.hasOwnProperty(item.status.toLowerCase())) {
            statusCounts[item.status.toLowerCase()]++;
        }
    });
    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Status',
            data: labels.map(label => statusCounts[label.toLowerCase()]),
            backgroundColor: backgroundColors
        }]
    };
    const config = {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        padding: 0,
                        boxWidth: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            layout: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            }
        }
    };
    new Chart(ctx, config);
}

document.addEventListener('DOMContentLoaded', () => {
    createChart(apiUrl1, document.getElementById('statusChart1').getContext('2d'), ['Selesai', 'Diproses', 'Menunggu'], ['#FF6384', '#36A2EB', '#FFCE56']);
    createChart(apiUrl2, document.getElementById('statusChart2').getContext('2d'), ['Dikirim', 'Diterima', 'Menunggu'], ['#4BC0C0', '#FF9F40', '#9966FF']);
    fetchMarqueeData();
});

async function fetchMarqueeData() {
    const kontainerMarquee = document.getElementById('marquee-container');
    kontainerMarquee.textContent = 'Mohon tunggu, sedang memproses pengambilan data...';
    try {
        const respons = await fetch(apiUrlBerita);
        const data = await respons.json();
        const beritaList = Object.values(data).map(item => `(${item.tag}) ${item.judul}`).join(' 🌐 ');
        kontainerMarquee.innerHTML = `<marquee>${beritaList}</marquee>`;
    } catch (error) {
        console.error('Kesalahan data:', error);
        kontainerMarquee.textContent = 'Terjadi kesalahan saat mengambil data.';
    }
}