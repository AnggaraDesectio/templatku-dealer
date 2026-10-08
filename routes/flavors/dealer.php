<?php

use App\Http\Controllers\Web\DealerController;
use Illuminate\Support\Facades\Route;

Route::prefix('dealer')->name('dealer.')->group(function () {
    Route::get('/', [DealerController::class, 'index'])->name('index');
    Route::get('/stok', [DealerController::class, 'stok'])->name('stok');
    Route::get('/spk', [DealerController::class, 'spk'])->name('spk');
    Route::get('/servis', [DealerController::class, 'servis'])->name('servis');
    Route::get('/sales', [DealerController::class, 'sales'])->name('sales');
    Route::get('/laporan', [DealerController::class, 'laporan'])->name('laporan');
});
