import { describe, it, expect } from "vitest";
import { createStep } from "./Step";
import type { NodeBase, SheetStatus } from "../../modele/types";

function buildNodeBase(id: string): NodeBase {
    return {
        id: id,
        title: id,
        description: "",
        gmNotes: "",
        progress: "brouillon",
    };
}

describe("createStep", () => {
    it("recopie les champs de la base au premier niveau", () => {
        const nodeBase = buildNodeBase("campement");

        const step = createStep(nodeBase, "layer-1", "depart", [], []);

        expect(step.id).toBe("campement");
        expect(step.title).toBe("campement");
        expect(step.description).toBe("");
        expect(step.gmNotes).toBe("");
        expect(step.progress).toBe("brouillon");
    });

    it("est toujours de type progression", () => {
        const step = createStep(buildNodeBase("campement"), "layer-1", "depart", [], []);

        expect(step.type).toBe("progression");
    });

    it("garde la couche et le rôle reçus", () => {
        const step = createStep(buildNodeBase("orth"), "layer-1", "depart", [], []);

        expect(step.layer).toBe("layer-1");
        expect(step.role).toBe("depart");
    });

    it("garde les drapeaux donnés et les statuts changés reçus", () => {
        const givenFlags = ["boussole", "info-expedition"];
        const changedStatuses: SheetStatus[] = [{ sheet: "rado", status: "allie" }];

        const step = createStep(buildNodeBase("campement"), "layer-1", "depart", givenFlags, changedStatuses);

        expect(step.given).toEqual(["boussole", "info-expedition"]);
        expect(step.changeStatus).toEqual([{ sheet: "rado", status: "allie" }]);
    });

    it("ne modifie pas la base reçue", () => {
        const nodeBase = buildNodeBase("campement");
        const nodeBaseBeforeCreation = structuredClone(nodeBase);

        createStep(nodeBase, "layer-1", "depart", [], []);

        expect(nodeBase).toEqual(nodeBaseBeforeCreation);
    });
});