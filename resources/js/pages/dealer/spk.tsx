import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Spk {
    id: number;
    no: string;
    pelanggan: string;
    unit: string;
    harga_rp: string;
    sales: string;
    tanggal: string;
    status_label: ToneLabel;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const STATUS_SPK = ['Dipesan', 'Proses Kredit', 'Lunas', 'Dibatalkan'];

const statusTone = (st: string): ToneLabel['tone'] =>
    st === 'Lunas' ? 'success' : st === 'Dibatalkan' ? 'destructive' : st === 'Proses Kredit' ? 'info' : 'warning';

export default function DealerSpk({ spks }: { spks: Record<string, any>[] }) {
    const [rows, setRows] = useState<Spk[]>(
        spks.map((s) => ({
            id: Number(s.id),
            no: String(s.no),
            pelanggan: String(s.pelanggan),
            unit: String(s.unit),
            harga_rp: String(s.harga_rp),
            sales: String(s.sales),
            tanggal: String(s.tanggal),
            status_label: s.status_label as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Spk | null>(null);
    const [pelanggan, setPelanggan] = useState('');
    const [unit, setUnit] = useState('');
    const [harga, setHarga] = useState('');
    const [sales, setSales] = useState('');
    const [status, setStatus] = useState('Dipesan');

    const openAdd = () => {
        setEditing(null);
        setPelanggan('');
        setUnit('');
        setHarga('');
        setSales('');
        setStatus('Dipesan');
        setOpen(true);
    };

    const openEdit = (row: Spk) => {
        setEditing(row);
        setPelanggan(row.pelanggan);
        setUnit(row.unit);
        setHarga(row.harga_rp.replace(/[^0-9]/g, ''));
        setSales(row.sales);
        setStatus(row.status_label.label);
        setOpen(true);
    };

    const simpan = () => {
        const hargaNum = Number(harga.replace(/[^0-9]/g, ''));
        if (!pelanggan.trim() || !unit.trim() || !hargaNum) {
            toast.error('Lengkapi pelanggan, unit, dan harga.');
            return;
        }
        const payload = {
            pelanggan: pelanggan.trim(),
            unit: unit.trim(),
            harga_rp: rupiah(hargaNum),
            sales: sales.trim() || '-',
            status_label: { label: status, tone: statusTone(status) } as ToneLabel,
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`SPK ${editing.no} diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            const no = `SPK-${String(id).padStart(4, '0')}`;
            const now = new Date();
            const tanggal = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
            setRows((rs) => [{ id, no, tanggal, ...payload }, ...rs]);
            toast.success(`${no} dibuat, ${unit.trim()} dipesan ${pelanggan.trim()}.`);
        }
        setOpen(false);
    };

    const columns: Column<Spk>[] = [
        { key: 'no', header: 'No. SPK', sortValue: (r) => r.no },
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan },
        { key: 'unit', header: 'Unit', sortValue: (r) => r.unit },
        {
            key: 'harga_rp',
            header: 'Harga',
            render: (r) => <span className="tnum font-medium">{r.harga_rp}</span>,
            sortValue: (r) => r.harga_rp,
        },
        { key: 'sales', header: 'Sales', mobileHidden: true, sortValue: (r) => r.sales },
        { key: 'tanggal', header: 'Tanggal', mobileHidden: true, sortValue: (r) => r.tanggal },
        {
            key: 'status_label',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status_label.label} tone={r.status_label.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status_label',
            label: 'Status',
            options: [
                { value: 'Lunas', label: 'Lunas' },
                { value: 'Proses Kredit', label: 'Proses Kredit' },
                { value: 'Dipesan', label: 'Dipesan' },
                { value: 'Dibatalkan', label: 'Dibatalkan' },
            ],
            match: (row: any, value: string) => row.status_label.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="SPK & Penjualan"
                description="Siapa pesan unit apa, pantau dari dipesan sampai lunas."
                breadcrumbs={[{ label: 'Dealer', href: '/dealer' }, { label: 'SPK & Penjualan' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Buat SPK
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Daftar SPK</CardTitle>
                    <p className="text-muted-foreground text-sm">{rows.length} SPK tercatat.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['no', 'pelanggan', 'unit', 'sales']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada SPK"
                        emptyDescription="Buat SPK pertama lewat tombol SPK Baru, nomor SPK dibuat otomatis."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah SPK' : 'SPK Baru'}</DialogTitle>
                        <DialogDescription>
                            Catat pemesanan unit, SPK baru berstatus Dipesan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                            <Label htmlFor="spk-pel">Nama pelanggan</Label>
                            <Input
                                id="spk-pel"
                                value={pelanggan}
                                onChange={(e) => setPelanggan(e.target.value)}
                                placeholder="cth. Bpk. Andi Wijaya"
                            />
                        </div>
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                            <Label htmlFor="spk-unit">Unit</Label>
                            <Input
                                id="spk-unit"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                placeholder="cth. Avanza G MT"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="spk-harga">Harga (Rp)</Label>
                            <Input
                                id="spk-harga"
                                inputMode="numeric"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                placeholder="250000000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="spk-sales">Sales</Label>
                            <Input
                                id="spk-sales"
                                value={sales}
                                onChange={(e) => setSales(e.target.value)}
                                placeholder="Nama sales"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="spk-status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="spk-status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_SPK.map((st) => (
                                        <SelectItem key={st} value={st}>
                                            {st}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Buat SPK'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
