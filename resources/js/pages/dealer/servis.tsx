import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Servis {
    id: number;
    no: string;
    pelanggan: string;
    unit: string;
    tanggal: string;
    keluhan: string;
    teknisi: string;
    status: ToneLabel;
}

const ALUR = ['Terjadwal', 'Dikerjakan', 'Selesai'];

const statusTone = (st: string): ToneLabel['tone'] =>
    st === 'Selesai' ? 'success' : st === 'Dikerjakan' ? 'info' : 'warning';

export default function DealerServis({ servis }: { servis: Record<string, any>[] }) {
    const [rows, setRows] = useState<Servis[]>(
        servis.map((s) => ({
            id: Number(s.id),
            no: String(s.no),
            pelanggan: String(s.pelanggan),
            unit: String(s.unit),
            tanggal: String(s.tanggal),
            keluhan: String(s.keluhan),
            teknisi: String(s.teknisi),
            status: s.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [pelanggan, setPelanggan] = useState('');
    const [unit, setUnit] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [keluhan, setKeluhan] = useState('');
    const [teknisi, setTeknisi] = useState('');

    const openAdd = () => {
        setPelanggan('');
        setUnit('');
        setTanggal(new Date().toISOString().slice(0, 10));
        setKeluhan('');
        setTeknisi('');
        setOpen(true);
    };

    const simpan = () => {
        if (!pelanggan.trim() || !unit.trim() || !tanggal.trim()) {
            toast.error('Lengkapi pelanggan, unit, dan tanggal servis.');
            return;
        }
        const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
        const no = `SRV-${String(id).padStart(4, '0')}`;
        setRows((rs) => [
            {
                id,
                no,
                pelanggan: pelanggan.trim(),
                unit: unit.trim(),
                tanggal: tanggal.trim(),
                keluhan: keluhan.trim() || '-',
                teknisi: teknisi.trim() || 'Belum ditugaskan',
                status: { label: 'Terjadwal', tone: 'warning' } as ToneLabel,
            },
            ...rs,
        ]);
        toast.success(`${no} terjadwal, ${unit.trim()} masuk bengkel ${tanggal.trim()}.`);
        setOpen(false);
    };

    // Majukan status servis satu tahap.
    const majukan = (row: Servis) => {
        const idx = ALUR.indexOf(row.status.label);
        if (idx < 0 || idx === ALUR.length - 1) return;
        const next = ALUR[idx + 1];
        setRows((rs) =>
            rs.map((r) => (r.id === row.id ? { ...r, status: { label: next, tone: statusTone(next) } } : r)),
        );
        toast.success(`${row.no} → ${next}.`);
    };

    const columns: Column<Servis>[] = [
        { key: 'no', header: 'No. Booking', sortValue: (r) => r.no },
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan },
        { key: 'unit', header: 'Unit', mobileHidden: true, sortValue: (r) => r.unit },
        { key: 'tanggal', header: 'Tanggal', sortValue: (r) => r.tanggal },
        { key: 'keluhan', header: 'Keluhan', mobileHidden: true, sortValue: (r) => r.keluhan },
        { key: 'teknisi', header: 'Teknisi', mobileHidden: true, sortValue: (r) => r.teknisi },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Terjadwal', label: 'Terjadwal' },
                { value: 'Dikerjakan', label: 'Dikerjakan' },
                { value: 'Selesai', label: 'Selesai' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Servis"
                description="Jadwalkan servis pelanggan, pantau dari terjadwal sampai selesai."
                breadcrumbs={[{ label: 'Dealer', href: '/dealer' }, { label: 'Servis' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Booking Servis
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Booking Servis</CardTitle>
                    <p className="text-muted-foreground text-sm">{rows.length} booking tercatat.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['no', 'pelanggan', 'unit', 'keluhan']}
                        filters={filters}
                        pageSize={10}
                        extraRowActions={(row) =>
                            ALUR.indexOf(row.status.label) < ALUR.length - 1 ? (
                                <Button size="sm" variant="outline" onClick={() => majukan(row)}>
                                    Lanjut <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                </Button>
                            ) : undefined
                        }
                        emptyTitle="Belum ada booking"
                        emptyDescription="Buat booking pertama lewat tombol Booking Servis."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Booking Servis Baru</DialogTitle>
                        <DialogDescription>
                            Catat unit yang masuk bengkel beserta keluhannya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="srv-pel">Nama pelanggan</Label>
                            <Input
                                id="srv-pel"
                                value={pelanggan}
                                onChange={(e) => setPelanggan(e.target.value)}
                                placeholder="cth. Ibu Dewi"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="srv-unit">Unit</Label>
                            <Input
                                id="srv-unit"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                placeholder="cth. Avanza B 1234 CD"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="srv-keluhan">Keluhan</Label>
                            <Input
                                id="srv-keluhan"
                                value={keluhan}
                                onChange={(e) => setKeluhan(e.target.value)}
                                placeholder="cth. AC tidak dingin"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="srv-tgl">Tanggal</Label>
                            <Input
                                id="srv-tgl"
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="srv-tek">Teknisi</Label>
                            <Input
                                id="srv-tek"
                                value={teknisi}
                                onChange={(e) => setTeknisi(e.target.value)}
                                placeholder="Nama teknisi"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>Buat Booking</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
