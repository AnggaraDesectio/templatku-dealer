<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\DealerData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman dealer OTOKU (Inertia). */
class DealerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dealer/index', [
            'ringkasan' => DealerData::ringkasan(),
            'penjualan' => DealerData::penjualanBulanan(),
            'spks'      => array_slice(DealerData::spks(), 0, 6),
        ]);
    }

    public function stok(): Response
    {
        return Inertia::render('dealer/stok', [
            'stoks' => DealerData::stoks(),
        ]);
    }

    public function spk(): Response
    {
        return Inertia::render('dealer/spk', [
            'spks' => DealerData::spks(),
        ]);
    }

    public function servis(): Response
    {
        return Inertia::render('dealer/servis', [
            'servis' => DealerData::servis(),
        ]);
    }

    public function sales(): Response
    {
        return Inertia::render('dealer/sales', [
            'sales' => DealerData::sales(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('dealer/laporan', [
            'ringkasan' => DealerData::ringkasan(),
            'bulanan'   => DealerData::penjualanBulanan(),
            'perMerk'   => DealerData::penjualanPerMerk(),
            'sales'     => DealerData::sales(),
        ]);
    }
}
