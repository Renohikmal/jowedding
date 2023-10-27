const tablesContainer = document.getElementById('tables');
const localStorageKey = 'reservations';

// Membuat 70 meja
for (let tableNumber = 1; tableNumber <= 70; tableNumber++) {
    const table = document.createElement('div');
    table.className = 'table';
    table.innerHTML = `<h2>Meja ${tableNumber}</h2>`;
    
    // Membuat 10 kursi untuk setiap meja
    const seatsContainer = document.createElement('div');
    seatsContainer.className = 'seats';
    for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        seat.textContent = `Kursi ${seatNumber}`;
        
        seat.addEventListener('click', () => {
            const reservations = JSON.parse(localStorage.getItem(localStorageKey)) || {};
            
            if (!seat.classList.contains('reserved')) {
                const name = prompt('Masukkan nama Anda:');
                if (name) {
                    seat.textContent = name;
                    seat.classList.add('reserved');
                    
                    // Simpan nama ke localStorage
                    if (!reservations[tableNumber]) {
                        reservations[tableNumber] = {};
                    }
                    reservations[tableNumber][seatNumber] = name;
                }
            } else {
                const currentName = seat.textContent;
                if (confirm(`Apakah Anda ingin menghapus reservasi ${currentName} pada kursi ini?`)) {
                    seat.textContent = `Kursi ${seatNumber}`;
                    seat.classList.remove('reserved');
                    
                    // Hapus nama dari localStorage
                    if (reservations[tableNumber] && reservations[tableNumber][seatNumber]) {
                        delete reservations[tableNumber][seatNumber];
                    }
                }
            }
            
            // Simpan data reservasi ke localStorage
            localStorage.setItem(localStorageKey, JSON.stringify(reservations));
        });
        
        seatsContainer.appendChild(seat);
    }
    
    table.appendChild(seatsContainer);
    tablesContainer.appendChild(table);
}

// Menampilkan reservasi yang ada saat halaman dimuat
const reservations = JSON.parse(localStorage.getItem(localStorageKey)) || {};
for (const tableNumber in reservations) {
    for (const seatNumber in reservations[tableNumber]) {
        const seat = tablesContainer.children[tableNumber - 1].querySelector(`.seat:nth-child(${seatNumber})`);
        seat.textContent = reservations[tableNumber][seatNumber];
        seat.classList.add('reserved');
    }

//Newcode
const tableNumberInput = document.getElementById('tableNumberInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', () => {
    const tableNumber = parseInt(tableNumberInput.value);
    
    if (!isNaN(tableNumber) && tableNumber >= 1 && tableNumber <= 70) {
        // Nomor meja valid, arahkan ke meja tersebut
        scrollToTable(tableNumber);
    } else {
        alert('Nomor meja tidak valid. Masukkan nomor meja antara 1 dan 70.');
    }
});

function scrollToTable(tableNumber) {
    const table = tablesContainer.children[tableNumber - 1];
    
    if (table) {
        table.scrollIntoView({ behavior: 'smooth' });
    }
}


}