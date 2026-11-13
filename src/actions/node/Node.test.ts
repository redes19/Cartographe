import { describe, it, expect } from "vitest";
import { createNodeBase } from "./Node";

describe("createNodeBase", () => {
    it("crée une base de nœud avec les valeurs reçues", () => {
        const nodeBase = createNodeBase(
            "rado",
            "Rado",
            "Un vieux sifflet aux mains brûlées.",
            "Ment sur sa blessure.",
            "brouillon"
        );

        expect(nodeBase).toEqual({
            id: "rado",
            title: "Rado",
            description: "Un vieux sifflet aux mains brûlées.",
            gmNotes: "Ment sur sa blessure.",
            progress: "brouillon",
        });
    });

    it("accepte une description et des notes vides", () => {
        const nodeBase = createNodeBase("orth", "Orth", "", "", "brouillon");

        expect(nodeBase.description).toBe("");
        expect(nodeBase.gmNotes).toBe("");
    });
});