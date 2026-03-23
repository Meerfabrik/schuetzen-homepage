"use client";

import { useState } from "react";
import GalerieGrid, { type GalerieImage } from "./GalerieGrid";
import styles from "./GalerieNav.module.css";

type Section = {
  heading: string;
  images: GalerieImage[];
};

type Props = {
  sections: Section[];
};

export default function GalerieWithNav({ sections }: Props) {
  const [selected, setSelected] = useState(sections[0]?.heading ?? "");

  if (sections.length <= 1) {
    return sections[0] ? <GalerieGrid images={sections[0].images} /> : null;
  }

  const current = sections.find((s) => s.heading === selected);

  return (
    <>
      <div className={styles.bar}>
        <select
          className={styles.select}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {sections.map((s) => (
            <option key={s.heading} value={s.heading}>
              {s.heading}
            </option>
          ))}
        </select>
        <span className={styles.count}>
          {current ? `${current.images.length} Bilder` : ""}
        </span>
      </div>
      {current && <GalerieGrid images={current.images} />}
    </>
  );
}
