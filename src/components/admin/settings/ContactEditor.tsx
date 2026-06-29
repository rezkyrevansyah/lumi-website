"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Mail, Phone } from "lucide-react";
import { type AdminContact } from "@/lib/admin-data";

interface ContactEditorProps {
  initialContact: AdminContact;
}

export default function ContactEditor({ initialContact }: ContactEditorProps) {
  const [contact, setContact] = useState(initialContact);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#3D3E4A]" style={{ fontFamily: "var(--font-rubik)" }}>
          Contact Information
        </h3>
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
          Used in the Contact section, Footer, and floating WhatsApp button.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-lg mb-4">
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-opensans)" }}>
            <Mail size={13} /> Email
          </Label>
          <Input
            type="email"
            value={contact.email}
            onChange={(e) => { setContact((p) => ({ ...p, email: e.target.value })); setSaved(false); }}
            style={{ fontFamily: "var(--font-opensans)" }}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-opensans)" }}>
            <Phone size={13} /> WhatsApp Number
          </Label>
          <Input
            value={contact.whatsapp}
            onChange={(e) => { setContact((p) => ({ ...p, whatsapp: e.target.value })); setSaved(false); }}
            placeholder="62812XXXXXXXX"
            style={{ fontFamily: "var(--font-opensans)" }}
          />
          <p className="text-[11px] text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
            Include country code without + (e.g. 6281234567890)
          </p>
        </div>
      </div>

      <Button onClick={handleSave} className={saved ? "bg-green-500 hover:bg-green-600 text-white gap-2" : "btn-primary gap-2"}
        style={{ fontFamily: "var(--font-opensans)" }}>
        {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
      </Button>
    </div>
  );
}
