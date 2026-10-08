import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, FileSignature, Wrench, Banknote } from 'lucide-react';

interface Ringkasan {
    stok_unit: number;
    spk_bulan_ini: number;
    unit_servis: number;
    omzet_rp: string;
}

interface Sales {
    id: number;
    nama: string;
    target_unit: number;
    aktual_unit: number;
    persen: number;
    status: ToneLabel;
}

export default function DealerLaporan({
    ringkasan,
    bulanan,
    perMerk,
    sales,
}: {
    ringkasan: Ringkasan;
    bulanan: ChartData;
    perMerk: ChartData;
    sales: Record<string, any>[];
}) {
    const rows: Sales[] = sales.map((s) => ({
        id: Number(s.id),
        nama: String(s.nama),
        target_unit: Number(s.target_unit),
        aktual_unit: Number(s.aktual_unit),
        persen: Number(s.persen),
        status: s.status as ToneLabel,
    }));

    const columns: Column<Sales>[] = [
        { key: 'nama', header: 'Sales', sortValue: (r) => r.nama },
        {
            key: 'target_unit',
            header: 'Target',
            render: (r) => <span className="tnum">{r.target_unit} unit</span>,
            sortValue: (r) => r.target_unit,
        },
        {
            key: 'aktual_unit',
            header: 'Aktual',
            render: (r) => <span className="tnum font-medium">{r.aktual_unit} unit</span>,
            sortValue: (r) => r.aktual_unit,
        },
        {
            key: 'persen',
            header: 'Capaian',
            render: (r) => <span className="tnum font-medium">{r.persen}%</span>,
            sortValue: (r) => r.persen,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Kinerja dealer: penjualan bulanan, per merk, dan capaian sales."
                breadcrumbs={[{ label: 'Dealer', href: '/dealer' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Stok Unit"
                    value={String(ringkasan.stok_unit)}
                    delta="unit di gudang"
                    trend="flat"
                    icon={Car}
                    hint="Unit kendaraan yang tersedia di gudang dealer."
                />
                <StatCard
                    label="SPK Bulan Ini"
                    value={String(ringkasan.spk_bulan_ini)}
                    delta="Oktober 2026"
                    trend="up"
                    icon={FileSignature}
                    hint="Surat pemesanan kendaraan yang dibuat bulan ini."
                />
                <StatCard
                    label="Booking Servis"
                    value={String(ringkasan.unit_servis)}
                    delta="unit masuk bengkel"
                    trend="flat"
                    icon={Wrench}
                    hint="Unit pelanggan yang sedang diservis."
                />
                <StatCard
                    label="Omzet"
                    value={ringkasan.omzet_rp}
                    delta="dari SPK lunas"
                    trend="up"
                    icon={Banknote}
                    hint="Pendapatan dari SPK yang sudah lunas."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Unit Terjual per Bulan</CardTitle>
                        <p className="text-muted-foreground text-sm">Tren 6 bulan terakhir.</p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={bulanan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Unit Terjual per Merk</CardTitle>
                        <p className="text-muted-foreground text-sm">Berdasarkan SPK berstatus lunas.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={perMerk} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Capaian Sales</CardTitle>
                        <p className="text-muted-foreground text-sm">Target vs realisasi Oktober 2026.</p>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            rows={rows}
                            emptyTitle="Belum ada data"
                            emptyDescription="Capaian sales akan tampil di sini."
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
