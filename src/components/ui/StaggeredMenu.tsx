"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./StaggeredMenu.css";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#2DD9A4", "#1E293B"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "/logo3_1920x1080.svg",
  menuButtonColor = "#3D3E4A",
  openMenuButtonColor = "#ffffff",
  accentColor = "#2DD9A4",
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    onMenuClose?.();
  }, [onMenuClose]);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next) onMenuOpen?.();
      else onMenuClose?.();
      return next;
    });
  }, [onMenuOpen, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        toggleBtnRef.current && !toggleBtnRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeOnClickAway, open, closeMenu]);

  const layers = (() => {
    const raw = colors?.length ? colors.slice(0, 4) : ["#2DD9A4", "#1E293B"];
    const arr = [...raw];
    if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
    return arr;
  })();

  const btnColor = open && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

  return (
    <div
      className={[className, "staggered-menu-wrapper", isFixed ? "fixed-wrapper" : ""].filter(Boolean).join(" ")}
      style={accentColor ? ({ "--sm-accent": accentColor } as React.CSSProperties) : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div className="sm-prelayers" aria-hidden="true">
        {layers.map((c, i) => (
          <div
            key={i}
            className="sm-prelayer"
            style={{
              background: c,
              transitionDelay: open ? `${i * 0.07}s` : `${(layers.length - 1 - i) * 0.04}s`,
            }}
          />
        ))}
      </div>

      <header className="staggered-menu-header" aria-label="Main navigation header">
        <Link href="/" className="sm-logo cursor-pointer" aria-label="Halaman Utama Lumi Beta Works">
          <Image
            src={logoUrl || "/logo3_1920x1080.svg"}
            alt="Lumi Beta Works"
            className="sm-logo-img hover:opacity-90 transition-opacity"
            draggable={false}
            width={140}
            height={40}
            style={{ width: "auto", height: 40 }}
            unoptimized
          />
        </Link>
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          style={{ color: btnColor, transition: "color 0.3s ease" }}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span className="sm-toggle-textLabel">{open ? "Close" : "Menu"}</span>
          </span>
          <span className="sm-icon" aria-hidden="true">
            <span className="sm-icon-line" />
            <span className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items?.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <Link
                    className="sm-panel-item"
                    href={it.link}
                    aria-label={it.ariaLabel}
                    data-index={idx + 1}
                    onClick={closeMenu}
                    style={{
                      transitionDelay: open ? `${0.18 + idx * 0.08}s` : "0s",
                    }}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displaySocials && socialItems?.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3
                className="sm-socials-title"
                style={{ transitionDelay: open ? "0.4s" : "0s" }}
              >
                Sosial Media
              </h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                      style={{
                        transitionDelay: open ? `${0.44 + i * 0.07}s` : "0s",
                      }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
