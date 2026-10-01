// --- DATA DEFAULT LANDING PAGE ---
const defaultData = {
    groomShort: "Fazl",
    brideShort: "Nadya",
    eventDay: "12",
    eventMonth: "12",
    eventYear: "2027",
    countdownTarget: "2027-12-12 09:00:00",
    
    groomFull: "Fazl El Hakeem, S.T",
    groomBirth: "LAHIR : 01 JANUARI 2007",
    groomParents: "PUTRA DARI BAPAK ANDY WEIR & IBU WINDY FLOREN",
    groomQuote: "“BAGI SAYA, DIA BUKAN HANYA PASANGAN, TAPI JUGA RUMAH TEMPAT SAYA SELALU INGIN PULANG.”",
    
    brideFull: "Nadya Sulfa, S.T",
    brideBirth: "LAHIR : 31 DESEMBER 2007",
    brideParents: "PUTRI DARI BAPAK ANDER TERZT & IBU DIANA LISEN",
    brideQuote: "“DIA ADALAH ALASAN SAYA PERCAYA BAHWA DOA-DOA BAIK SELALU MENEMUKAN JALANNYA DI WAKTU YANG TEPAT.”",
    
    story1Title: "FIRST MET (2020)",
    story1Text: "KAMI BERTEMU DI KAMPUS - “Pertemuan sederhana yang menjadi awal dari cerita luar biasa.”",
    story2Title: "THE JOURNEY (2024-2026)",
    story2Text: "KAMI BEKERJA DI TEMPAT YANG SAMA - “Dari langkah yang sama, tumbuh rasa yang semakin nyata.”",
    story3Title: "THE BEGINNING OF FOREVER (2027)",
    story3Text: "KAMI MELANGKAH BERSAMA KE KEHIDUPAN BARU - “Hari ini bukan akhir dari perjalanan, melainkan awal dari selamanya.”",
    
    mapsUrl: "https://www.google.com/maps/place/Sopo+GABEMA/@1.2635352,101.1785192,17z/",
    cashlessText: "JIKA MEMBERI MERUPAKAN UNGKAPAN TANDA KASIH, BAPAK/IBU/SAUDARA/I DAPAT MEMBERI HADIAH SECARA CASHLESS. TERIMA KASIH."
};

// --- INISIALISASI & CEK LOGIN ---
document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    loadFormData();
    renderWishes();
});

// Sistem Login sederhana
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "123456") {
        localStorage.setItem("isAdminLoggedIn", "true");
        checkAuth();
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

function checkAuth() {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (isLoggedIn) {
        document.getElementById("loginView").style.display = "none";
        document.getElementById("dashboardView").style.display = "flex";
    } else {
        document.getElementById("loginView").style.display = "flex";
        document.getElementById("dashboardView").style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("isAdminLoggedIn");
    checkAuth();
}

// --- SWITCH TAB ---
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(el => el.classList.remove("active"));
    
    // Show selected
    document.getElementById(`tab-${tabName}`).classList.add("active");
    event.currentTarget.classList.add("active");

    // Sembunyikan tombol simpan saat di tab ucapan
    const saveBar = document.getElementById("saveBar");
    if (tabName === 'ucapan') {
        saveBar.style.display = 'none';
    } else {
        saveBar.style.display = 'block';
    }

    // Set Header Title
    const titles = {
        pengantin: "Pengantin & Informasi Utama",
        detail: "Detail Informasi Pasangan",
        story: "Love Story / Perjalanan Cinta",
        lokasi: "Lokasi Acara & Media",
        ucapan: "Daftar Pesan & Ucapan Tamu"
    };
    document.getElementById("pageTitle").innerText = titles[tabName];
}

// --- BACA & SIMPAN DATA LANDING PAGE ---
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem("weddingData")) || defaultData;
    
    Object.keys(savedData).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = savedData[key];
        }
    });
}

document.getElementById("adminDataForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {};
    const inputs = document.querySelectorAll("#adminDataForm input, #adminDataForm textarea");
    
    inputs.forEach(input => {
        if (input.name) {
            formData[input.name] = input.value;
        }
    });

    localStorage.setItem("weddingData", JSON.stringify(formData));
    showToast("Perubahan data berhasil disimpan!");
});

// --- MANAJEMEN UCAPAN TAMU ---
function renderWishes() {
    const wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
    const tbody = document.getElementById("wishesTableBody");
    tbody.innerHTML = "";

    if (wishes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: #888;">Belum ada ucapan tamu.</td></tr>`;
        return;
    }

    wishes.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td>${escapeHtml(item.message)}</td>
            <td><button class="btn-del" onclick="deleteWish(${index})">Hapus</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteWish(index) {
    let wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
    wishes.splice(index, 1);
    localStorage.setItem("weddingWishes", JSON.stringify(wishes));
    renderWishes();
    showToast("Pesan berhasil dihapus!");
}

function clearAllWishes() {
    if (confirm("Apakah Anda yakin ingin menghapus SELURUH pesan ucapan?")) {
        localStorage.removeItem("weddingWishes");
        renderWishes();
        showToast("Semua ucapan berhasil dibersihkan!");
    }
}

// Helper Toast & Security
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}