<?php

namespace App\Support\Demo;

/**
 * Data demo dealer OTOKU: stok unit, SPK penjualan, booking servis,
 * dan kinerja sales.
 * Kontrak status: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 * Baris mentah dipakai internal agar tidak ada rekursi.
 */
class DealerData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    /** Baris mentah stok unit (10 unit). */
    private static function stokRows(): array
    {
        return [
            ['id' => 1,  'merk' => 'Toyota',    'tipe' => 'Avanza 1.5 G',       'warna' => 'Putih',   'tahun' => 2026, 'harga' => 245000000, 'status' => 'tersedia'],
            ['id' => 2,  'merk' => 'Toyota',    'tipe' => 'Avanza 1.5 G',       'warna' => 'Hitam',   'tahun' => 2026, 'harga' => 245000000, 'status' => 'terjual'],
            ['id' => 3,  'merk' => 'Honda',     'tipe' => 'Brio RS',            'warna' => 'Merah',   'tahun' => 2026, 'harga' => 233900000, 'status' => 'tersedia'],
            ['id' => 4,  'merk' => 'Honda',     'tipe' => 'Brio RS',            'warna' => 'Putih',   'tahun' => 2025, 'harga' => 223900000, 'status' => 'tersedia'],
            ['id' => 5,  'merk' => 'Daihatsu',  'tipe' => 'Xenia 1.3 R',        'warna' => 'Silver',  'tahun' => 2026, 'harga' => 228500000, 'status' => 'dipesan'],
            ['id' => 6,  'merk' => 'Suzuki',    'tipe' => 'Ertiga GX',          'warna' => 'Abu-abu', 'tahun' => 2026, 'harga' => 267500000, 'status' => 'tersedia'],
            ['id' => 7,  'merk' => 'Toyota',    'tipe' => 'Kijang Innova Zenix','warna' => 'Hitam',   'tahun' => 2026, 'harga' => 612000000, 'status' => 'tersedia'],
            ['id' => 8,  'merk' => 'Honda',     'tipe' => 'HR-V SE',            'warna' => 'Putih',   'tahun' => 2026, 'harga' => 399900000, 'status' => 'terjual'],
            ['id' => 9,  'merk' => 'Daihatsu',  'tipe' => 'Sigra 1.2 R',        'warna' => 'Merah',   'tahun' => 2025, 'harga' => 168200000, 'status' => 'tersedia'],
            ['id' => 10, 'merk' => 'Mitsubishi','tipe' => 'Xpander Ultimate',   'warna' => 'Silver',  'tahun' => 2026, 'harga' => 324900000, 'status' => 'tersedia'],
        ];
    }

    private static function statusStok(string $key): array
    {
        return match ($key) {
            'tersedia' => ['label' => 'Tersedia', 'tone' => 'success'],
            'dipesan'  => ['label' => 'Dipesan',  'tone' => 'warning'],
            default    => ['label' => 'Terjual', 'tone' => 'info'],
        };
    }

    /** Baris mentah sales. */
    private static function salesRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'Andi Kurniawan', 'target_unit' => 12, 'aktual_unit' => 10],
            ['id' => 2, 'nama' => 'Budi Setiawan',  'target_unit' => 12, 'aktual_unit' => 8],
            ['id' => 3, 'nama' => 'Dewi Ratnasari', 'target_unit' => 10, 'aktual_unit' => 9],
            ['id' => 4, 'nama' => 'Eko Prasetyo',   'target_unit' => 10, 'aktual_unit' => 7],
            ['id' => 5, 'nama' => 'Fitri Rahayu',   'target_unit' => 8,  'aktual_unit' => 8],
            ['id' => 6, 'nama' => 'Galih Permana',  'target_unit' => 8,  'aktual_unit' => 5],
        ];
    }

    private static function statusSpk(string $key): array
    {
        return match ($key) {
            'lunas'         => ['label' => 'Lunas',         'tone' => 'success'],
            'proses_kredit' => ['label' => 'Proses Kredit', 'tone' => 'warning'],
            'dipesan'       => ['label' => 'Dipesan',       'tone' => 'info'],
            default         => ['label' => 'Dibatalkan',    'tone' => 'destructive'],
        };
    }

    /** Baris mentah SPK (10): terikat stok unit + sales. */
    private static function spkRows(): array
    {
        return [
            ['id' => 1,  'no' => 'SPK-2026-0118', 'pelanggan' => 'H. Muhammad Ridwan',  'stok_id' => 1,  'sales_id' => 1, 'tanggal' => '8 Okt 2026',  'status' => 'proses_kredit'],
            ['id' => 2,  'no' => 'SPK-2026-0117', 'pelanggan' => 'Siti Nurhaliza',      'stok_id' => 7,  'sales_id' => 3, 'tanggal' => '7 Okt 2026',  'status' => 'lunas'],
            ['id' => 3,  'no' => 'SPK-2026-0116', 'pelanggan' => 'Drs. Bambang Sutrisno','stok_id' => 10, 'sales_id' => 2, 'tanggal' => '6 Okt 2026',  'status' => 'proses_kredit'],
            ['id' => 4,  'no' => 'SPK-2026-0115', 'pelanggan' => 'Ratna Dewi',          'stok_id' => 3,  'sales_id' => 3, 'tanggal' => '5 Okt 2026',  'status' => 'lunas'],
            ['id' => 5,  'no' => 'SPK-2026-0114', 'pelanggan' => 'Ir. Joko Santoso',    'stok_id' => 5,  'sales_id' => 4, 'tanggal' => '4 Okt 2026',  'status' => 'dipesan'],
            ['id' => 6,  'no' => 'SPK-2026-0113', 'pelanggan' => 'Agus Salim',          'stok_id' => 6,  'sales_id' => 5, 'tanggal' => '3 Okt 2026',  'status' => 'lunas'],
            ['id' => 7,  'no' => 'SPK-2026-0112', 'pelanggan' => 'Maria Ulfa',          'stok_id' => 8,  'sales_id' => 1, 'tanggal' => '30 Sep 2026', 'status' => 'lunas'],
            ['id' => 8,  'no' => 'SPK-2026-0111', 'pelanggan' => 'Hendra Saputra',      'stok_id' => 2,  'sales_id' => 6, 'tanggal' => '28 Sep 2026', 'status' => 'dibatalkan'],
            ['id' => 9,  'no' => 'SPK-2026-0110', 'pelanggan' => 'Rina Marlina',        'stok_id' => 9,  'sales_id' => 2, 'tanggal' => '25 Sep 2026', 'status' => 'lunas'],
            ['id' => 10, 'no' => 'SPK-2026-0109', 'pelanggan' => 'Dedi Hermawan',       'stok_id' => 4,  'sales_id' => 4, 'tanggal' => '20 Sep 2026', 'status' => 'lunas'],
        ];
    }

    /** Stok unit dengan label status dan harga Rp. */
    public static function stoks(): array
    {
        return array_map(function ($s) {
            $s['harga_rp'] = self::rp($s['harga']);
            $s['status_label'] = self::statusStok($s['status']);
            return $s;
        }, self::stokRows());
    }

    /** SPK dengan nama unit, harga, dan nama sales. */
    public static function spks(): array
    {
        $stoks = [];
        foreach (self::stokRows() as $s) {
            $stoks[$s['id']] = $s;
        }
        $sales = [];
        foreach (self::salesRows() as $s) {
            $sales[$s['id']] = $s['nama'];
        }

        return array_map(function ($spk) use ($stoks, $sales) {
            $unit = $stoks[$spk['stok_id']] ?? null;
            $spk['unit'] = $unit ? $unit['merk'].' '.$unit['tipe'].' '.$unit['tahun'] : '-';
            $spk['harga'] = $unit['harga'] ?? 0;
            $spk['harga_rp'] = self::rp($spk['harga']);
            $spk['sales'] = $sales[$spk['sales_id']] ?? '-';
            $spk['status_label'] = self::statusSpk($spk['status']);
            return $spk;
        }, self::spkRows());
    }

    /** Booking servis. */
    public static function servis(): array
    {
        return [
            ['id' => 1, 'no' => 'SV-2026-0091', 'pelanggan' => 'Wahyu Hidayat', 'unit' => 'Toyota Avanza, B 1234 ABC',  'tanggal' => '9 Okt 2026', 'keluhan' => 'Ganti oli + tune up',      'teknisi' => 'Asep',  'status' => ['label' => 'Terjadwal', 'tone' => 'info']],
            ['id' => 2, 'no' => 'SV-2026-0090', 'pelanggan' => 'Sri Mulyani',   'unit' => 'Honda Brio, B 5678 DEF',     'tanggal' => '9 Okt 2026', 'keluhan' => 'Rem bunyi saat mengerem',   'teknisi' => 'Budi',  'status' => ['label' => 'Terjadwal', 'tone' => 'info']],
            ['id' => 3, 'no' => 'SV-2026-0089', 'pelanggan' => 'Tono Sugiarto', 'unit' => 'Daihatsu Xenia, B 9012 GHI', 'tanggal' => '8 Okt 2026', 'keluhan' => 'AC tidak dingin',           'teknisi' => 'Asep',  'status' => ['label' => 'Dikerjakan', 'tone' => 'warning']],
            ['id' => 4, 'no' => 'SV-2026-0088', 'pelanggan' => 'Yuni Astuti',   'unit' => 'Suzuki Ertiga, B 3456 JKL',  'tanggal' => '8 Okt 2026', 'keluhan' => 'Servis berkala 10.000 km',  'teknisi' => 'Candra','status' => ['label' => 'Selesai',   'tone' => 'success']],
            ['id' => 5, 'no' => 'SV-2026-0087', 'pelanggan' => 'Rudi Firmansyah','unit'=> 'Honda HR-V, B 7890 MNO',    'tanggal' => '7 Okt 2026', 'keluhan' => 'Ban bocor, ganti 2 ban',    'teknisi' => 'Budi',  'status' => ['label' => 'Selesai',   'tone' => 'success']],
            ['id' => 6, 'no' => 'SV-2026-0086', 'pelanggan' => 'Lilis Suryani', 'unit' => 'Toyota Avanza, B 1122 PQR',  'tanggal' => '7 Okt 2026', 'keluhan' => 'Lampu depan mati',          'teknisi' => 'Asep',  'status' => ['label' => 'Selesai',   'tone' => 'success']],
            ['id' => 7, 'no' => 'SV-2026-0085', 'pelanggan' => 'Dadan Ramdani', 'unit' => 'Daihatsu Sigra, D 3344 STU', 'tanggal' => '6 Okt 2026', 'keluhan' => 'Servis berkala 5.000 km',   'teknisi' => 'Candra','status' => ['label' => 'Selesai',   'tone' => 'success']],
            ['id' => 8, 'no' => 'SV-2026-0084', 'pelanggan' => 'Nina Kurnia',   'unit' => 'Mitsubishi Xpander, B 5566 VWX','tanggal' => '6 Okt 2026','keluhan' => 'Spooring & balancing',    'teknisi' => 'Budi',  'status' => ['label' => 'Selesai',   'tone' => 'success']],
        ];
    }

    /** Sales dengan capaian target vs aktual. */
    public static function sales(): array
    {
        return array_map(function ($s) {
            $persen = $s['target_unit'] > 0 ? round($s['aktual_unit'] / $s['target_unit'] * 100) : 0;
            $s['persen'] = $persen;
            $s['status'] = $persen >= 100
                ? ['label' => 'Target tercapai', 'tone' => 'success']
                : ($persen >= 70 ? ['label' => 'Mendekati target', 'tone' => 'warning'] : ['label' => 'Di bawah target', 'tone' => 'destructive']);
            return $s;
        }, self::salesRows());
    }

    /** Ringkasan angka dashboard (dihitung dari data). */
    public static function ringkasan(): array
    {
        $spks = self::spks();
        $spkBulanIni = array_filter($spks, fn ($s) => str_contains($s['tanggal'], 'Okt 2026'));
        $lunas = array_filter($spks, fn ($s) => $s['status'] === 'lunas');
        $omzet = array_sum(array_column($lunas, 'harga'));

        return [
            'stok_unit'    => count(self::stokRows()),
            'spk_bulan_ini'=> count($spkBulanIni),
            'unit_servis'  => count(self::servis()),
            'omzet'        => $omzet,
            'omzet_rp'     => self::rp($omzet),
        ];
    }

    /** Unit terjual per bulan untuk bar chart. */
    public static function penjualanBulanan(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Unit terjual', 'data' => [9, 11, 10, 12, 9, 11]]],
        ];
    }

    /** Unit lunas per merk untuk bar chart. */
    public static function penjualanPerMerk(): array
    {
        $agg = [];
        foreach (self::spks() as $s) {
            if ($s['status'] !== 'lunas') {
                continue;
            }
            foreach (self::stokRows() as $st) {
                if ($st['id'] === $s['stok_id']) {
                    $agg[$st['merk']] = ($agg[$st['merk']] ?? 0) + 1;
                }
            }
        }
        ksort($agg);

        return [
            'labels'   => array_keys($agg),
            'datasets' => [['label' => 'Unit terjual', 'data' => array_values($agg)]],
        ];
    }
}
