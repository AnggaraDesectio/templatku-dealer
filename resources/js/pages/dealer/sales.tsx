import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Sales {
    id: number;
    nama: string;
    target_unit: number;
    aktual_unit: number;
    persen: number;
    status: ToneLabel;
}

export default function DealerSales({ sales }: { sales: Record<string, any>[] }) {
    const rows: Sales[] = sales.map((s) => ({
        id: Number(s.id),
        nama: String(s.nama),
        target_unit: Number(s.target_unit),
        aktual_unit: Number(s.aktual_unit),
        persen: Number(s.persen),
        status: s.status as ToneLabel,
    }));

    const columns: Column<Sales>[] = [
        {
            key: 'nama',
            header: 'Sales',
            render: (r) => (
                <span className="inline-flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {r.nama.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{r.nama}</span>
                </span>
            ),
            sortValue: (r) => r.nama,
        },
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
            render: (r) => (
                <span className="inline-flex min-w-40 items-center gap-2">
                    <span className="bg-muted h-2 w-24 overflow-hidden rounded-full">
                        <span
                            className="bg-primary block h-full rounded-full"
                            style={{ width: `${Math.min(r.persen, 100)}%` }}
                        />
                    </span>
                    <span className="tnum text-xs font-medium">{r.persen}%</span>
                </span>
            ),
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
                title="Sales"
                description="Kinerja tim sales: target vs realisasi penjualan unit."
                breadcrumbs={[{ label: 'Dealer', href: '/dealer' }, { label: 'Sales' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Kinerja Sales</CardTitle>
                    <p className="text-muted-foreground text-sm">{rows.length} sales, periode Oktober 2026.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama']}
                        pageSize={10}
                        emptyTitle="Belum ada data sales"
                        emptyDescription="Data sales akan tampil di sini."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
