import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import Moderation from "./Moderation";

vi.mock("axios");

describe("Page Moderation", () => {
  test("affiche le titre de la page", async () => {
    axios.get.mockResolvedValueOnce({
      data: [],
    });

    render(
      <MemoryRouter>
        <Moderation />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("heading", {
        name: /modération/i,
      })
    ).toBeInTheDocument();
  });
});