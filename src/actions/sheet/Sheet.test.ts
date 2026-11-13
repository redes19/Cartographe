import { describe, it, expect } from "vitest";
import { createSheet } from "./Sheet";
import { definitionsDesTypes } from "../../modele/definitionsDesTypes";
import type { NodeBase, TypeOfSheet } from "../../modele/types";

function buildNodeBase(id: string): NodeBase {
    return {
        id: id,
        title: id,
        description: "",
        gmNotes: "",
        progress: "brouillon",
    };
}

const allSheetTypes: TypeOfSheet[] = ["pnj", "monstre", "batiment", "lieu", "objet"];

describe("createSheet", () => {
    it("recopie les champs de la base au premier niveau", () => {
        const nodeBase = buildNodeBase("rado");

        const sheet = createSheet(nodeBase, "pnj");

        expect(sheet.id).toBe("rado");
        expect(sheet.title).toBe("rado");
        expect(sheet.description).toBe("");
        expect(sheet.gmNotes).toBe("");
        expect(sheet.progress).toBe("brouillon");
    });

    it("garde le type reçu", () => {
        const sheet = createSheet(buildNodeBase("rado"), "pnj");

        expect(sheet.type).toBe("pnj");
    });

    it("donne à un PNJ le statut initial vivant", () => {
        const sheet = createSheet(buildNodeBase("rado"), "pnj");

        expect(sheet.initialStatus).toBe("vivant");
    });

    it("donne à un PNJ les champs motivation et apparence, vides", () => {
        const sheet = createSheet(buildNodeBase("rado"), "pnj");

        expect(sheet.fields).toEqual({ motivation: "", apparence: "" });
    });

    it("donne à un objet les champs effet et rareté, vides", () => {
        const sheet = createSheet(buildNodeBase("boussole"), "objet");

        expect(sheet.fields).toEqual({ effet: "", rarete: "" });
    });

    it.each(allSheetTypes)("suit la table des définitions pour le type %s", (sheetType) => {
        const definition = definitionsDesTypes[sheetType];

        const sheet = createSheet(buildNodeBase("test"), sheetType);

        expect(sheet.initialStatus).toBe(definition.statuts[0]);
        expect(Object.keys(sheet.fields)).toEqual(definition.fields);
    });

    it("ne modifie pas la base reçue", () => {
        const nodeBase = buildNodeBase("rado");
        const nodeBaseBeforeCreation = structuredClone(nodeBase);

        createSheet(nodeBase, "pnj");

        expect(nodeBase).toEqual(nodeBaseBeforeCreation);
    });

    it("donne à chaque fiche ses propres champs", () => {
        const firstSheet = createSheet(buildNodeBase("rado"), "pnj");
        const secondSheet = createSheet(buildNodeBase("ozen"), "pnj");

        expect(firstSheet.fields).not.toBe(secondSheet.fields);
    });
});