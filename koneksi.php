<?php

// nama host, Username, password dan nama db
$koneksi = mysqli_connect("localhost","id21460715_admin","Admin@123","id21460715_joeldb");

// Periksa Koneksi
if (mysqli_connect_error()){
    echo "Koneksi database gagal : " . mysqli_connect_error();

}
?>

