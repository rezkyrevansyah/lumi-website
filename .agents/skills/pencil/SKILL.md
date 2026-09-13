---
name: pencil
description: Work with pen.dev desktop app, canvas, and .pen design files. Use when asked to create, inspect, edit, read, or validate UI/UX designs in pen.dev or when interacting with .pen documents.
---

# pen.dev (Pencil) Integration

Use the `pencil` MCP tools to interact with pen.dev apps and `.pen` design files.

## Prerequisites
1. Pen desktop app or IDE host is running.
2. A `.pen` document is open.

## Available MCP Tools
- `pencil:get_app_state`: Check running app state and active open `.pen` files.
- `pencil:read_skill`: Read pen.dev design guidelines and instructions.
  - `read_skill()`: Read root SKILL.md.
  - `read_skill({ path })`: Read specific sub-guides (e.g. `execute.md`, `guide/web-app.md`).
- `pencil:get_style`: List and load visual style archetypes (fonts, colors, palettes).
- `pencil:execute`: Execute JavaScript snippets against the active `.pen` design document.
- `pencil:browser`: Interact with the pen.dev canvas viewport.

## Critical Rules
- Do NOT read, grep, or edit `.pen` files directly with file tools. They are encrypted/binary and must be accessed only via `pencil` MCP tools.
- Always check `get_app_state` first to confirm the document connection.
