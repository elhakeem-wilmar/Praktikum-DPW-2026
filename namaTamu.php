<?php
// 1. Data tamu dimasukkan ke dalam Array
// Menggunakan index 1, 2, 3 agar sesuai dengan pemanggilan ?tamu=1/2/3
$data_tamu = [
    1 => "Susilo Bambang Yudhoyono",
    2 => "Joko Widodo",
    3 => "Prabowo Subianto"
];

// 2. Cek apakah ada parameter 'tamu' di URL
$id_tamu = isset($_GET['tamu']) ? $_GET['tamu'] : null;

// 3. Tentukan nama yang akan ditampilkan
$nama_tamu_tampil = "Tamu Undangan"; // Nama default jika URL tidak pakai ?tamu=
if ($id_tamu != null && array_key_exists($id_tamu, $data_tamu)) {
    $nama_tamu_tampil = $data_tamu[$id_tamu]; // Mengambil nama dari array sesuai nomor
}
?>