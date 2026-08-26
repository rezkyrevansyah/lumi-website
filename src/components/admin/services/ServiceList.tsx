"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TagBadge from "@/components/admin/shared/TagBadge";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import PageHeader from "@/components/admin/shared/PageHeader";
import ServiceFormDialog from "./ServiceFormDialog";
import { type AdminService } from "@/lib/admin-data";
import { createService, updateService, deleteService } from "@/actions/services";

interface ServiceListProps {
  initialItems: AdminService[];
}

export default function ServiceList({ initialItems }: ServiceListProps) {
  const [items, setItems] = useState<AdminService[]>(initialItems);
  const [editItem, setEditItem] = useState<AdminService | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleEdit(item: AdminService) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function handleSave(data: Omit<AdminService, "id"> & { id?: number }) {
    startTransition(async () => {
      const payload = {
        title: data.title,
        shortDesc: data.shortDesc,
        summary: data.summary ?? undefined,
        badgeLabel: data.badgeLabel ?? undefined,
        badgeColor: data.badgeColor ?? undefined,
        deliverables: data.deliverables ?? [],
        techStack: data.techStack ?? [],
        slaLabel: data.slaLabel ?? undefined,
        iconPath: data.iconPath ?? undefined,
        iconType: data.iconType ?? "path",
        slug: data.slug,
        waMessage: data.waMessage ?? undefined,
        tags: data.tags ?? [],
        sortOrder: data.sortOrder ?? 0,
      };

      if (!data.id) {
        const created = await createService(payload);
        if (created) setItems((prev) => [...prev, created as AdminService]);
      } else {
        const updated = await updateService(data.id, payload);
        if (updated) setItems((prev) => prev.map((i) => (i.id === data.id ? (updated as AdminService) : i)));
      }
      setDialogOpen(false);
    });
  }

  function handleDelete(id: number) {
    startTransition(async () => {
      await deleteService(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
    });
  }

  return (
    <>
      <PageHeader
        title="Services"
        description={`${items.length} layanan`}
        action={
          <Button onClick={handleAdd} className="btn-primary gap-2" style={{ fontFamily: "var(--font-opensans)" }}>
            <Plus size={15} />
            Add Service
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead style={{ fontFamily: "var(--font-rubik)" }}>Service</TableHead>
              <TableHead style={{ fontFamily: "var(--font-rubik)" }}>SLA</TableHead>
              <TableHead style={{ fontFamily: "var(--font-rubik)" }}>Tags</TableHead>
              <TableHead className="text-right" style={{ fontFamily: "var(--font-rubik)" }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    {item.badgeColor && (
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.badgeColor }} />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs mt-0.5"
                        style={{ fontFamily: "var(--font-opensans)" }}>
                        {item.shortDesc}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
                    {item.slaLabel ?? "—"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(item.tags ?? []).slice(0, 3).map((tag) => (
                      <TagBadge key={tag} label={tag} color="#6C63FF" />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}
                      className="h-8 w-8 text-muted-foreground hover:text-[#6C63FF]">
                      <Pencil size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(item.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ServiceFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        onSave={handleSave}
        saving={isPending}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete service?"
        description="Layanan ini akan dihapus permanen dari database."
        onConfirm={() => deleteId !== null && handleDelete(deleteId)}
      />
    </>
  );
}
