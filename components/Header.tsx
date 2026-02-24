"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/navigation";
import { SITE_LOGO } from "@/lib/site";
import type { NavChild, NavItem } from "@/lib/types";
import styles from "./Header.module.css";

function DropdownMenu({ items }: { items: NavChild[] }) {
  return (
    <ul className={styles.dropdown}>
      {items.map((item) => (
        <li key={item.href} className={styles.dropdownItem}>
          <Link href={item.href} className={styles.dropdownLink}>
            {item.label}
          </Link>
          {item.children && (
            <ul className={styles.subDropdown}>
              {item.children.map((sub) => (
                <li key={sub.href}>
                  <Link href={sub.href} className={styles.dropdownLink}>
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

const SCROLL_THRESHOLD = 40;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      ref={headerRef}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
          <Image
            src={SITE_LOGO.src}
            alt={SITE_LOGO.alt}
            width={SITE_LOGO.width}
            height={SITE_LOGO.height}
            style={{ objectFit: "contain" }}
            priority
          />
          <span className={styles.logoText}>
            St. Sebastianus Schützenbruderschaft Büderich 1567
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className={styles.desktopNav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item: NavItem) => (
              <li key={item.href} className={styles.navItem}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                  {item.children && <span className={styles.arrow}>▾</span>}
                </Link>
                {item.children && <DropdownMenu items={item.children} />}
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
          aria-label="Menü"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <nav className={styles.mobileNav} aria-label="Mobile Navigation">
          {NAV_ITEMS.map((item: NavItem) => (
            <div key={item.href} className={styles.mobileItem}>
              {item.children ? (
                <>
                  <button
                    className={styles.mobileToggle}
                    onClick={() =>
                      setOpenMobileItem(openMobileItem === item.href ? null : item.href)
                    }
                  >
                    {item.label}
                    <span className={openMobileItem === item.href ? styles.rotated : ""}>▾</span>
                  </button>
                  {openMobileItem === item.href && (
                    <div className={styles.mobileSub}>
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={styles.mobileSubLink}
                          onClick={() => setMobileOpen(false)}
                        >
                          › {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
