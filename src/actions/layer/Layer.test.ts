import { describe, it, expect } from "vitest";
import { createLayer } from "./Layer";

describe("createLayer", () => {
    it("crée une couche avec les valeurs reçues", () => {
        const layer = createLayer("layer-1", "Couche 1", 1);

        expect(layer).toEqual({
            id: "layer-1",
            name: "Couche 1",
            order: 1,
        });
    });

    it("renvoie un nouvel objet à chaque appel", () => {
        const firstLayer = createLayer("layer-1", "Couche 1", 1);
        const secondLayer = createLayer("layer-1", "Couche 1", 1);

        expect(firstLayer).toEqual(secondLayer);
        expect(firstLayer).not.toBe(secondLayer);
    });
});