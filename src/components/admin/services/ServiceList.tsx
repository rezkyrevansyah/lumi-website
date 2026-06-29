"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TagBadge from "@/components/admin/shared/TagBadge";
import PageHeader from "@/components/admin/shared/PageHeader";
import ServiceFormDialog from "./ServiceFormDialog";
import { type AdminService } from "@/lib/admin-data";

interface ServiceListProps {
  initialItems: AdminService[];
}

export default function ServiceList({ initialItems }: ServiceListProps) {
  const [items, setItems] = useState(initialItems);
  const [editItem, setEditItem] = useState<AdminService | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleEdit(item: AdminService) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleSave(data: AdminService) {
    setItems((prev) => prev.map((i) => (i.id === data.id ? data : i)));
  }

  return (
    <>
      <PageHeader
        title="Services"
        description="Edit your service offerings. Services cannot be added or removed — only their content."
      />

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="w-8" style={{ fontFamily: "var(--font-rubik)" }}>#</TableHead>
              <TableHead style={{ fontFamily: "var(--font-rubik)" }}>Service</TableHead>
              <TableHead style={{ fontFamily: "var(--font-rubik)" }}>Tags</TableHead>
              <TableHead className="text-right" style={{ fontFamily: "var(--font-rubik)" }}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <TableCell>
                  <span className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
                    {idx + 1}
                  </span>
                </TableCell>
                <TableCell>
                  <p className="text-sm font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs mt-0.5"
                    style={{ fontFamily: "var(--font-opensans)" }}>
                    {item.desc}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <TagBadge key={tag} label={tag} color="#6C63FF" />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}
                    className="h-8 w-8 text-muted-foreground hover:text-[#6C63FF]">
                    <Pencil size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editItem && (
        <ServiceFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          item={editItem}
          onSave={handleSave}
        />
      )}
    </>
  );
}
