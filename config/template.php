<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "dealer".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'dealer'),

    'flavors' => array (
  'dealer' => 
  array (
    'label' => 'Dealer',
    'brand_name' => 'OTOKU',
    'brand_tagline' => 'Dealer kendaraan',
    'brand_initials' => 'OT',
    'accent' => '#164e63',
    'category' => 'bisnis',
    'home' => 'dealer.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Dealer',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/dealer',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Stok Unit',
              'to' => '/dealer/stok',
              'icon' => 'Car',
            ),
            2 => 
            array (
              'label' => 'SPK & Penjualan',
              'to' => '/dealer/spk',
              'icon' => 'FileSignature',
            ),
            3 => 
            array (
              'label' => 'Servis',
              'to' => '/dealer/servis',
              'icon' => 'Wrench',
            ),
            4 => 
            array (
              'label' => 'Sales',
              'to' => '/dealer/sales',
              'icon' => 'Users',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/dealer/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
