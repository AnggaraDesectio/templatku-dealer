import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, FileSignature, Wrench, Banknote, FilePlus2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Spk {
    id: number;
    no: string;
    pelanggan: string;
    unit: string;
    harga_rp: string;
    sales: string;
    status_label: ToneLabel;
}

interface Ringkasan {
    stok_unit: number;
    spk_bulan_ini: number;
    unit_servis: number;
    omzet_rp: string;
}

export default function DealerIndex({
    ringkasan,
    penjualan,
    spks,
}: {
    ringkasan: Ringkasan;
    penjualan: ChartData;
    spks: Record<string, any>[];
}) {
    const rows: Spk[] = spks.map((s) => ({
        id: Number(s.id),
        no: String(s.no),
        pelanggan: String(s.pelanggan),
        unit: String(s.unit),
        harga_rp: String(s.harga_rp),
        sales: String(s.sales),
        status_label: s.status_label as ToneLabel,
    }));

    const columns: Column<Spk>[] = [
        { key: 'no', header: 'No. SPK', sortValue: (r) => r.no },
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan },
        { key: 'unit', header: 'Unit', mobileHidden: true, sortValue: (r) => r.unit },
        {
            key: 'harga_rp',
            header: 'Harga',
            render: (r) => <span className="tnum font-medium">{r.harga_rp}</span>,
            sortValue: (r) => r.harga_rp,
        },
        { key: 'sales', header: 'Sales', mobileHidden: true, sortValue: (r) => r.sales },
        {
            key: 'status_label',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status_label.label} tone={r.status_label.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Dealer"
                description="Ringkasan operasional dealer OTOKU: stok, penjualan, servis, dan omzet."
                breadcrumbs={[{ label: 'Dealer' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/dealer/spk">
                            <FilePlus2 className="mr-2 h-4 w-4" /> SPK Baru
                        </Link>
                    </Button>
                }
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
            <div className="mt-4">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Unit Terjual 6 Bulan Terakhir</CardTitle>
                        <p className="text-muted-foreground text-sm">Jumlah unit berdasarkan SPK.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={penjualan} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['no', 'pelanggan', 'unit']}
                    emptyTitle="Belum ada SPK"
                    emptyDescription="SPK terbaru akan tampil di sini."
                />
            </div>
        </AuthenticatedLayout>
    );
}
