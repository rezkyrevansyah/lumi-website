"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Globe, Smartphone } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TagBadge from "@/components/admin/shared/TagBadge";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import PortfolioFormDialog from "./PortfolioFormDialog";
import EmptyState from "@/components/admin/shared/EmptyState";
import PageHeader from "@/components/admin/shared/PageHeader";
import { FolderKanban } from "lucide-react";
import { type AdminPortfolioItem } from "@/lib/admin-data";

interface PortfolioTableProps {
  initialItems: AdminPortfolioItem[];
}

function PlatformIcon({ platform }: { platform: "web" | "android" | "ios" }) {
  if (platform === "web") return <Globe size={13} className="text-muted-foreground" />;
  return <Smartphone size={13} className="text-muted-foreground" />;
}

export default function PortfolioTable({ initialItems }: PortfolioTableProps) {
  const [items, setItems] = useState(initialItems);
  const [editItem, setEditItem] = useState<AdminPortfolioItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function handleEdit(item: AdminPortfolioItem) {
    setEditItem(item);
    setDialogOpen(true);
  }

  function handleAdd() {
    setEditItem(null);
    setDialogOpen(true);
  }

  function handleSave(data: AdminPortfolioItem) {
    setItems((prev) =>
      prev.find((i) => i.id === data.id)
        ? prev.map((i) => (i.id === data.id ? data : i))
        : [...prev, data]
    );
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <>
      <PageHeader
        title="Portfolio"
        description={`${items.length} project${items.length !== 1 ? "s" : ""}`}
        action={
          <Button onClick={handleAdd} className="btn-primary gap-2"
            style={{ fontFamily: "var(--font-opensans)" }}>
            <Plus size={15} />
            Add Project
          </Button>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No portfolio items yet"
          description="Add your first project to showcase your work."
          action={
            <Button onClick={handleAdd} className="btn-primary gap-2"
              style={{ fontFamily: "var(--font-opensans)" }}>
              <Plus size={15} /> Add Project
            </Button>
          }
        />
      ) : (
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead style={{ fontFamily: "var(--font-rubik)" }}>Project</TableHead>
                <TableHead style={{ fontFamily: "var(--font-rubik)" }}>Category</TableHead>
                <TableHead style={{ fontFamily: "var(--font-rubik)" }}>Platforms</TableHead>
                <TableHead style={{ fontFamily: "var(--font-rubik)" }}>Tags</TableHead>
                <TableHead className="text-right" style={{ fontFamily: "var(--font-rubik)" }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl shrink-0" style={{ background: item.bg }}>
                        <div className="w-full h-full rounded-xl flex items-center justify-center"
                          style={{ background: `${item.color}30` }}>
                          <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
                          {item.client}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
                      {item.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {item.platforms.map((p) => (
                        <span key={p} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-muted text-xs text-muted-foreground capitalize"
                          style={{ fontFamily: "var(--font-opensans)" }}>
                          <PlatformIcon platform={p} />
                          {p}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <TagBadge key={tag} label={tag} color={item.color} />
                      ))}
                      {item.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
                          +{item.tags.length - 2}
                        </span>
                      )}
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
      )}

      <PortfolioFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editItem}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete portfolio item?"
        description="This will remove the project from your portfolio. This action cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
      />
    </>
  );
}
