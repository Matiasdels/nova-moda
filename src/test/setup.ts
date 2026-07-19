import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

// next/image y next/link requieren el contexto de Next.js en runtime; en los
// tests los reemplazamos por sus equivalentes HTML nativos.
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, priority: _priority, sizes: _sizes, ...rest } = props;
    return React.createElement("img", { alt: "", ...rest });
  },
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children?: React.ReactNode;
  } & Record<string, unknown>) => React.createElement("a", { href, ...rest }, children),
}));
