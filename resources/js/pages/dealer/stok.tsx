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

interface Stok {
    id: number;
    merk: string;
    tipe: string;
    warna: string;
    tahun: number;
    harga_rp: string;
    status_label: ToneLabel;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const STATUS_UNIT = ['Tersedia', 'Dipesan', 'Terjual'];

const statusTone = (st: string): ToneLabel['tone'] =>
    st === 'Tersedia' ? 'success' : st === 'Dipesan' ? 'warning' : 'info';

export default function DealerStok({ stoks }: { stoks: Record<string, any>[] }) {
    const [rows, setRows] = useState<Stok[]>(
        stoks.map((s) => ({
            id: Number(s.id),
            merk: String(s.merk),
            tipe: String(s.tipe),
            warna: String(s.warna),
            tahun: Number(s.tahun),
            harga_rp: String(s.harga_rp),
            status_label: s.status_label as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Stok | null>(null);
    const [merk, setMerk] = useState('');
    const [tipe, setTipe] = useState('');
    const [warna, setWarna] = useState('');
    const [tahun, setTahun] = useState(String(new Date().getFullYear()));
    const [harga, setHarga] = useState('');
    const [status, setStatus] = useState('Tersedia');

    const openAdd = () => {
        setEditing(null);
        setMerk('');
        setTipe('');
        setWarna('');
        setTahun(String(new Date().getFullYear()));
        setHarga('');
        setStatus('Tersedia');
        setOpen(true);
    };

    const openEdit = (row: Stok) => {
        setEditing(row);
        setMerk(row.merk);
        setTipe(row.tipe);
        setWarna(row.warna);
        setTahun(String(row.tahun));
        setHarga(row.harga_rp.replace(/[^0-9]/g, ''));
        setStatus(row.status_label.label);
        setOpen(true);
    };

    const simpan = () => {
        const hargaNum = Number(harga.replace(/[^0-9]/g, ''));
        if (!merk.trim() || !tipe.trim() || !hargaNum) {
            toast.error('Lengkapi merk, tipe, dan harga unit.');
            return;
        }
        const payload = {
            merk: merk.trim(),
            tipe: tipe.trim(),
            warna: warna.trim() || '-',
            tahun: Number(tahun) || new Date().getFullYear(),
            harga_rp: rupiah(hargaNum),
            status_label: { label: status, tone: statusTone(status) } as ToneLabel,
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`Unit ${merk.trim()} ${tipe.trim()} diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [{ id, ...payload }, ...rs]);
            toast.success(`Unit ${merk.trim()} ${tipe.trim()} masuk stok.`);
        }
        setOpen(false);
    };


    const columns: Column<Stok>[] = [
        { key: 'merk', header: 'Merk', sortValue: (r) => r.merk },
        { key: 'tipe', header: 'Tipe', sortValue: (r) => r.tipe },
        { key: 'warna', header: 'Warna', mobileHidden: true, sortValue: (r) => r.warna },
        {
            key: 'tahun',
            header: 'Tahun',
            render: (r) => <span className="tnum">{r.tahun}</span>,
            sortValue: (r) => r.tahun,
        },
        {
            key: 'harga_rp',
            header: 'Harga',
            render: (r) => <span className="tnum font-medium">{r.harga_rp}</span>,
            sortValue: (r) => r.harga_rp,
        },
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
                { value: 'Tersedia', label: 'Tersedia' },
                { value: 'Dipesan', label: 'Dipesan' },
                { value: 'Terjual', label: 'Terjual' },
            ],
            match: (row: any, value: string) => row.status_label.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Stok Unit"
                description="Unit di gudang, catat tiap unit masuk biar tidak ada yang kelewat."
                breadcrumbs={[{ label: 'Dealer', href: '/dealer' }, { label: 'Stok Unit' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Unit
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Stok Unit</CardTitle>
                    <p className="text-muted-foreground text-sm">{rows.length} unit tercatat.</p>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['merk', 'tipe', 'warna']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Stok kosong"
                        emptyDescription="Unit kendaraan akan tampil di sini."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Unit' : 'Tambah Unit Baru'}</DialogTitle>
                        <DialogDescription>
                            Catat unit yang masuk gudang beserta harganya.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="stk-merk">Merk</Label>
                            <Input
                                id="stk-merk"
                                value={merk}
                                onChange={(e) => setMerk(e.target.value)}
                                placeholder="cth. Toyota"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stk-tipe">Tipe</Label>
                            <Input
                                id="stk-tipe"
                                value={tipe}
                                onChange={(e) => setTipe(e.target.value)}
                                placeholder="cth. Avanza G MT"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stk-warna">Warna</Label>
                            <Input
                                id="stk-warna"
                                value={warna}
                                onChange={(e) => setWarna(e.target.value)}
                                placeholder="cth. Hitam"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stk-tahun">Tahun</Label>
                            <Input
                                id="stk-tahun"
                                inputMode="numeric"
                                value={tahun}
                                onChange={(e) => setTahun(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stk-harga">Harga (Rp)</Label>
                            <Input
                                id="stk-harga"
                                inputMode="numeric"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                placeholder="250000000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="stk-status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="stk-status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_UNIT.map((st) => (
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
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Tambah Unit'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
