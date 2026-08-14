import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

function ExempleRecettes() {
  return <h1>Recettes</h1>;
}

describe("Page Recettes", () => {
  test("affiche le titre", () => {
    render(<ExempleRecettes />);

    expect(
      screen.getByRole("heading", {
        name: /recettes/i,
      })
    ).toBeInTheDocument();
  });
});