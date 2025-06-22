// script.js

// Function to toggle the mobile menu visibility
function toggleMenu() {
    const menu = document.querySelector('.navbar .menu');
    menu.classList.toggle('active');
}

// Helper function to generate distinct random colors
// Digunakan sebagai fallback jika warna partai tidak didefinisikan dalam partyColors
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.8)`;
}

    // Labels untuk sumbu X (Kabupaten/Kota)
const labels = ["Bantul", "Gunung Kidul", "Kota Yogyakarta", "Kulon Progo", "Sleman"];

// Data suara partai per kabupaten/kota untuk 2024 (Vertikal Chart Format)
const dataPartai2024_vertical = {
    "PKB": [83194, 50873, 10128, 38428, 63004],
    "Gerindra": [68663, 54277, 30753, 40107, 78365],
    "PDIP": [147594, 93575, 78612, 75917, 198271],
    "Golkar": [87335, 100931, 18553, 34035, 61991],
    "NasDem": [16264, 49887, 11611, 10336, 42732],
    "Partai Buruh": [3820, 2320, 2635, 1272, 5296],
    "Partai Gelora": [3261, 3313, 1511, 1513, 3134],
    "PKS": [87998, 39229, 31094, 28663, 85077],
    "PKN": [1048, 891, 409, 238, 1052],
    "Hanura": [823, 1493, 453, 341, 937],
    "Partai Garda Republik Indonesia": [1318, 1138, 478, 530, 1328],
    "PAN": [39031, 41375, 18514, 21152, 78590],
    "PBB": [1437, 505, 297, 270, 741],
    "Partai Demokrat": [13119, 16850, 5032, 3057, 11145],
    "PSI": [15191, 12313, 14475, 7627, 22392],
    "Partai Perindo": [2180, 2120, 1957, 783, 3194],
    "PPP": [14895, 3185, 8856, 4098, 16809],
    "Partai Ummat": [18947, 4728, 10662, 5811, 15362],
};

// Data suara partai per kabupaten/kota untuk 2019 (Vertikal Chart Format)
const dataPartai2019_vertical = {
    "PKB": [76373, 47376, 8653, 38228, 94008],
    "Gerindra": [57715, 37887, 18125, 24736, 52883],
    "PDIP": [177227, 102392, 101139, 72190, 201140],
    "Golkar": [35869, 54388, 11497, 17930, 33219],
    "NasDem": [30331, 74588, 10159, 9505, 42097],
    "PKS": [61857, 37770, 22166, 33834, 74188],
    "Hanura": [852, 3177, 477, 839, 1642],
    "Partai Garda Republik Indonesia": [2207, 1832, 504, 1387, 2709],
    "PAN": [57476, 43481, 36418, 31490, 68866],
    "PBB": [3377, 1618, 864, 823, 2696],
    "Partai Demokrat": [19110, 15734, 6777, 7234, 13853],
    "PSI": [8944, 4344, 12323, 2571, 17165],
    "Partai Perindo": [6435, 6705, 3610, 3339, 7275],
    "PPP": [22406, 6622, 8034, 4894, 20401],
    "Partai Keadilan dan Persatuan": [1097, 403, 651, 355, 1161],
    "Partai Berkarya": [16221, 16155, 5063, 8362, 14810]
};


// Warna khusus untuk setiap partai, sekarang termasuk partai dari tahun 2019
const partaiColors = {
    "PKB": "darkgreen",
    "Gerindra": "darkorange",
    "PDIP": "red",
    "Golkar": "gold", // Mengubah dari 'yellow' ke 'gold' agar lebih konsisten
    "NasDem": "darkblue",
    "Partai Buruh": "darkred", // Memberikan warna yang lebih konsisten
    "Partai Gelora": "dodgerblue", // Mengubah dari 'lightblue' ke 'dodgerblue'
    "PKS": "limegreen", // Mengubah dari 'orange' ke 'limegreen'
    "PKN": "maroon", // Memberikan warna yang lebih konsisten
    "Hanura": "coral", // Mengubah dari 'lightcoral' ke 'coral'
    "Partai Garda Republik Indonesia": "royalblue", // Mengubah dari 'blue' ke 'royalblue'
    "PAN": "navy", // Mengubah dari 'darkblue' ke 'navy'
    "PBB": "forestgreen", // Mengubah dari 'green' ke 'forestgreen'
    "Partai Demokrat": "steelblue", // Mengubah dari 'darkblue' ke 'steelblue'
    "PSI": "tomato", // Mengubah dari 'red' ke 'tomato'
    "Partai Perindo": "mediumpurple", // Mengubah dari 'blue' ke 'mediumpurple'
    "PPP": "darkgreen", // Mengubah dari 'green' ke 'darkgreen'
    "Partai Ummat": "dimgray", // Mengubah dari 'black' ke 'dimgray'
    // Warna untuk partai spesifik 2019
    "Partai Keadilan dan Persatuan": "firebrick ", // Warna baru untuk konsistensi
    "Partai Berkarya": "yellow" // Warna baru untuk konsistensi
};

// Fungsi untuk menyiapkan dataset untuk diagram batang vertikal
function createVerticalChartDatasets(dataPartaiSource, partaiColorsSource) {
    return Object.keys(dataPartaiSource).map(partai => ({
        label: partai,
        data: dataPartaiSource[partai],
        backgroundColor: partaiColorsSource[partai] || '#CCCCCC', // Fallback warna abu-abu
        borderColor: partaiColorsSource[partai] || '#CCCCCC',
        borderWidth: 1
    }));
}

// Membuat grafik untuk tahun 2024
const ctx2024 = document.getElementById('stackedBarChart2024').getContext('2d');
const stackedBarChart2024 = new Chart(ctx2024, {
    type: 'bar',
    data: {
        labels: labels, // Sumbu X adalah Kabupaten/Kota
        datasets: createVerticalChartDatasets(dataPartai2024_vertical, partaiColors)
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) { // Untuk bar vertikal, nilai ada di sumbu Y
                            label += new Intl.NumberFormat('id-ID').format(context.parsed.y) + ' suara';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true // Mengaktifkan stack pada sumbu X (bar)
            },
            y: {
                stacked: true, // Mengaktifkan stack pada sumbu Y (nilai dalam bar)
                beginAtZero: true
            }
        },
        animation: {
            duration: 0 // Tanpa animasi untuk respons instan
        }
    }
});

// Membuat grafik untuk tahun 2019
const ctx2019 = document.getElementById('stackedBarChart2019').getContext('2d');
const stackedBarChart2019 = new Chart(ctx2019, {
    type: 'bar',
    data: {
        labels: labels, // Sumbu X adalah Kabupaten/Kota
        datasets: createVerticalChartDatasets(dataPartai2019_vertical, partaiColors)
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) { // Untuk bar vertikal, nilai ada di sumbu Y
                            label += new Intl.NumberFormat('id-ID').format(context.parsed.y) + ' suara';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true // Mengaktifkan stack pada sumbu X (bar)
            },
            y: {
                stacked: true, // Mengaktifkan stack pada sumbu Y (nilai dalam bar)
                beginAtZero: true
            }
        },
        animation: {
            duration: 0 // Tanpa animasi untuk respons instan
        }
    }
});
