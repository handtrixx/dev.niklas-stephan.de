import styles from "./index.module.css";

import { useEffect, useState } from "react";

export default function PostBody({ content }) {
  return (
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
