"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function TagInput({ tags, onChange, placeholder = "Add tag…", className }: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag() {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
    }
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-wrap gap-1.5 min-h-[2rem]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#2DD9A4]/10 text-[#2DD9A4] border border-[#2DD9A4]/20"
            style={{ fontFamily: "var(--font-opensans)" }}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-red-500 transition-colors"
            >
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={addTag}
        placeholder={placeholder}
        className="text-sm"
        style={{ fontFamily: "var(--font-opensans)" }}
      />
      <p className="text-[11px] text-muted-foreground" style={{ fontFamily: "var(--font-opensans)" }}>
        Press Enter or comma to add a tag
      </p>
    </div>
  );
}
