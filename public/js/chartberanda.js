const apiUrl1 = 'https://solusiadil-api.vercel.app/konsultasi';
const apiUrl2 = 'https://solusiadil-api.vercel.app/blogs';
const apiUrl3 = 'https://solusiadil-api.vercel.app/users';
const apiUrl4 = 'https://solusiadil-api.vercel.app/admin';
const apiUrl5 = 'https://solusiadil-api.vercel.app/konsultasi';
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

async function createChart(apiUrl, ctx, labels, backgroundColors, chartTitle) {
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
                title: {
                    display: true,
                    text: chartTitle // Menambahkan judul chart
                },
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
    createChart(apiUrl1, document.getElementById('statusChart1').getContext('2d'), ['Selesai', 'Diproses', 'Menunggu'], ['#FF6384', '#36A2EB', '#FFCE56'], 'Data Layanan Konsultasi');
    createChart(apiUrl2, document.getElementById('statusChart2').getContext('2d'), ['Dikirim', 'Diterima', 'Menunggu'], ['#FF6384', '#36A2EB', '#FFCE56'], 'Data Layanan Pendataan Blog');
    fetchMarqueeData();
});

async function fetchTotalData(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return Object.keys(data).length;
}

async function createBarChart(ctx, userCount, adminCount) {
    const chartData = {
        labels: ['Users', 'Admin'],
        datasets: [{
            label: 'Total',
            data: [userCount, adminCount],
            backgroundColor: ['#36A2EB', '#FF6384']
        }]
    };
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y', // Membuat chart menjadi horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Data User dan Admin' // Judul chart
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    };
    new Chart(ctx, config);
}

document.addEventListener('DOMContentLoaded', async () => {
    const userCount = await fetchTotalData(apiUrl3);
    const adminCount = await fetchTotalData(apiUrl4);

    createBarChart(document.getElementById('userAdminChart').getContext('2d'), userCount, adminCount);
});

async function fetchConsultationData(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return Object.values(data);
}

async function createConsultationBarChart(ctx, consultationData) {
    const consultationTotals = {};

    // Menghitung jumlah penanganan konsultasi per nama_apph
    consultationData.forEach(item => {
        const { nama_apph } = item;
        if (consultationTotals[nama_apph]) {
            consultationTotals[nama_apph]++;
        } else {
            consultationTotals[nama_apph] = 1;
        }
    });

    const apphNames = Object.keys(consultationTotals);
    const consultationCounts = Object.values(consultationTotals);

    const chartData = {
        labels: apphNames,
        datasets: [{
            label: 'Total Penanganan Konsultasi',
            data: consultationCounts,
            backgroundColor: '#36A2EB'
        }]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y', // Membuat chart menjadi horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Data Penanganan Konsultasi Oleh APPH' // Judul chart
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(ctx, config);
}

document.addEventListener('DOMContentLoaded', async () => {
    const consultationData = await fetchConsultationData(apiUrl5);
    createConsultationBarChart(document.getElementById('consultationChart').getContext('2d'), consultationData);
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