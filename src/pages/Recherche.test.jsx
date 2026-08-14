import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import api from "../lib/axios";
import Recherche from "./Recherche";

vi.mock("../lib/axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("Page Recherche", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  test("affiche les recettes reçues du serveur", async () => {
    api.get.mockResolvedValue({
      data: {
        recettes: [
          {
            _id: "68a000000000000000000001",
            fiche: "Salade avocat",
            description3: "Une recette simple et rapide.",
            category: {
              description2: "Entrée",
            },
          },
        ],
      },
    });

    render(<Recherche />);

    expect(
      await screen.findByText("Salade avocat")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Une recette simple et rapide.")
    ).toBeInTheDocument();
  });

  test("affiche un message si aucune recette n’est trouvée", async () => {
    api.get.mockResolvedValue({
      data: [],
    });

    render(<Recherche />);

    expect(
      await screen.findByText("Aucune recette trouvée.")
    ).toBeInTheDocument();
  });

  test("envoie le mot-clé à l’API", async () => {
    api.get.mockResolvedValue({
      data: [],
    });

    render(<Recherche />);

    const input = screen.getByRole("searchbox");

    fireEvent.change(input, {
      target: {
        value: "poulet",
      },
    });

    await waitFor(
      () => {
        expect(api.get).toHaveBeenCalledWith(
          expect.stringContaining("/recette/all"),
          expect.objectContaining({
            params: {
              search: "poulet",
            },
            signal: expect.any(AbortSignal),
          })
        );
      },
      {
        timeout: 2000,
      }
    );
  });

  test("affiche une erreur lorsque l’API échoue", async () => {
    api.get.mockRejectedValue(
      new Error("Erreur réseau")
    );

    render(<Recherche />);

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      /erreur|impossible|chargement/i
    );
  });
});