import { describe, it, expect } from "vitest";
import {
    initializedCampaign,
    insertLayerInCampaign,
    insertNodeInCampaign,
    updateNodeInCampaign,
    removeNodeFromCampaign,
} from "./Campaign";
import type { Campaign, Layer, Link, Sheet, Step, TypeOfLink } from "../../modele/types";

function buildLayer(id: string, order: number): Layer {
    return {
        id: id,
        name: `Couche ${order}`,
        order: order,
    };
}

function buildStep(id: string, layerId: string): Step {
    return {
        id: id,
        type: "progression",
        title: id,
        description: "",
        gmNotes: "",
        progress: "brouillon",
        layer: layerId,
        role: "depart",
        given: [],
        changeStatus: [],
    };
}

function buildSheet(id: string): Sheet {
    return {
        id: id,
        type: "pnj",
        title: id,
        description: "",
        gmNotes: "",
        progress: "brouillon",
        initialStatus: "vivant",
        fields: { motivation: "", apparence: "" },
    };
}

function buildLink(id: string, type: TypeOfLink, from: string, to: string): Link {
    return {
        id: id,
        type: type,
        from: from,
        to: to,
    };
}

function buildCampaignWithGraph(): Campaign {
    const emptyCampaign = initializedCampaign("Campagne de test");

    return {
        ...emptyCampaign,
        layers: [buildLayer("layer-1", 1)],
        nodes: [
            buildStep("orth", "layer-1"),
            buildStep("forest", "layer-1"),
            buildSheet("rado"),
        ],
        links: [
            buildLink("orth-to-forest", "suite", "orth", "forest"),
            buildLink("forest-to-rado", "presence", "forest", "rado"),
            buildLink("orth-to-rado", "presence", "orth", "rado"),
        ],
    };
}

describe("initializedCampaign", () => {
    it("donne le nom reçu à la campagne", () => {
        const campaign = initializedCampaign("Made in Abyss");

        expect(campaign.name).toBe("Made in Abyss");
    });

    it("crée une campagne sans aucun contenu", () => {
        const campaign = initializedCampaign("Made in Abyss");

        expect(campaign.layers).toEqual([]);
        expect(campaign.flags).toEqual([]);
        expect(campaign.nodes).toEqual([]);
        expect(campaign.links).toEqual([]);
        expect(campaign.intendedAlerts).toEqual([]);
    });

    it("renvoie des tableaux neufs à chaque appel", () => {
        const firstCampaign = initializedCampaign("Première");
        const secondCampaign = initializedCampaign("Seconde");

        expect(firstCampaign.nodes).not.toBe(secondCampaign.nodes);
    });
});

describe("insertLayerInCampaign", () => {
    it("ajoute la couche à la fin des couches existantes", () => {
        const campaign = buildCampaignWithGraph();
        const newLayer = buildLayer("layer-2", 2);

        const updatedCampaign = insertLayerInCampaign(campaign, newLayer);

        expect(updatedCampaign.layers).toHaveLength(2);
        expect(updatedCampaign.layers[1]).toEqual(newLayer);
    });

    it("conserve le reste de la campagne", () => {
        const campaign = buildCampaignWithGraph();

        const updatedCampaign = insertLayerInCampaign(campaign, buildLayer("layer-2", 2));

        expect(updatedCampaign.nodes).toEqual(campaign.nodes);
        expect(updatedCampaign.links).toEqual(campaign.links);
    });

    it("ne modifie pas la campagne d'origine", () => {
        const campaign = buildCampaignWithGraph();
        const campaignBeforeInsertion = structuredClone(campaign);

        insertLayerInCampaign(campaign, buildLayer("layer-2", 2));

        expect(campaign).toEqual(campaignBeforeInsertion);
    });
});

describe("insertNodeInCampaign", () => {
    it("ajoute une étape", () => {
        const campaign = buildCampaignWithGraph();
        const newStep = buildStep("cave", "layer-1");

        const updatedCampaign = insertNodeInCampaign(campaign, newStep);

        expect(updatedCampaign.nodes).toHaveLength(4);
        expect(updatedCampaign.nodes).toContainEqual(newStep);
    });

    it("ajoute une fiche", () => {
        const campaign = buildCampaignWithGraph();
        const newSheet = buildSheet("ozen");

        const updatedCampaign = insertNodeInCampaign(campaign, newSheet);

        expect(updatedCampaign.nodes).toHaveLength(4);
        expect(updatedCampaign.nodes).toContainEqual(newSheet);
    });

    it("ne modifie pas la campagne d'origine", () => {
        const campaign = buildCampaignWithGraph();
        const campaignBeforeInsertion = structuredClone(campaign);

        insertNodeInCampaign(campaign, buildStep("cave", "layer-1"));

        expect(campaign).toEqual(campaignBeforeInsertion);
    });
});

describe("updateNodeInCampaign", () => {
    it("remplace le nœud qui a le même id", () => {
        const campaign = buildCampaignWithGraph();
        const updatedOrth = { ...campaign.nodes[0], title: "Orth, la ville du bord" };

        const updatedCampaign = updateNodeInCampaign(campaign, updatedOrth);

        const orthAfterUpdate = updatedCampaign.nodes.find((node) => node.id === "orth");
        expect(orthAfterUpdate?.title).toBe("Orth, la ville du bord");
    });

    it("garde le même nombre de nœuds", () => {
        const campaign = buildCampaignWithGraph();
        const updatedOrth = { ...campaign.nodes[0], title: "Orth, la ville du bord" };

        const updatedCampaign = updateNodeInCampaign(campaign, updatedOrth);

        expect(updatedCampaign.nodes).toHaveLength(3);
    });

    it("laisse les autres nœuds intacts", () => {
        const campaign = buildCampaignWithGraph();
        const updatedOrth = { ...campaign.nodes[0], title: "Orth, la ville du bord" };

        const updatedCampaign = updateNodeInCampaign(campaign, updatedOrth);

        expect(updatedCampaign.nodes[1]).toBe(campaign.nodes[1]);
        expect(updatedCampaign.nodes[2]).toBe(campaign.nodes[2]);
    });

    it("ne modifie pas la campagne d'origine", () => {
        const campaign = buildCampaignWithGraph();
        const campaignBeforeUpdate = structuredClone(campaign);
        const updatedOrth = { ...campaign.nodes[0], title: "Orth, la ville du bord" };

        updateNodeInCampaign(campaign, updatedOrth);

        expect(campaign).toEqual(campaignBeforeUpdate);
    });

    it("ne change rien si aucun nœud n'a cet id", () => {
        const campaign = buildCampaignWithGraph();
        const unknownNode = buildStep("unknown", "layer-1");

        const updatedCampaign = updateNodeInCampaign(campaign, unknownNode);

        expect(updatedCampaign).toEqual(campaign);
    });
});

describe("removeNodeFromCampaign", () => {
    it("retire le nœud", () => {
        const campaign = buildCampaignWithGraph();

        const updatedCampaign = removeNodeFromCampaign(campaign, "forest");

        const nodeIds = updatedCampaign.nodes.map((node) => node.id);
        expect(nodeIds).toEqual(["orth", "rado"]);
    });

    it("retire les liens qui arrivent au nœud et ceux qui en partent", () => {
        const campaign = buildCampaignWithGraph();

        const updatedCampaign = removeNodeFromCampaign(campaign, "forest");

        const linkIds = updatedCampaign.links.map((link) => link.id);
        expect(linkIds).not.toContain("orth-to-forest");
        expect(linkIds).not.toContain("forest-to-rado");
    });

    it("garde les liens qui ne concernent pas le nœud", () => {
        const campaign = buildCampaignWithGraph();

        const updatedCampaign = removeNodeFromCampaign(campaign, "forest");

        const linkIds = updatedCampaign.links.map((link) => link.id);
        expect(linkIds).toEqual(["orth-to-rado"]);
    });

    it("ne modifie pas la campagne d'origine", () => {
        const campaign = buildCampaignWithGraph();
        const campaignBeforeRemoval = structuredClone(campaign);

        removeNodeFromCampaign(campaign, "forest");

        expect(campaign).toEqual(campaignBeforeRemoval);
    });

    it("ne change rien si aucun nœud n'a cet id", () => {
        const campaign = buildCampaignWithGraph();

        const updatedCampaign = removeNodeFromCampaign(campaign, "unknown");

        expect(updatedCampaign).toEqual(campaign);
    });

    it.todo("retire les statuts changés par les étapes qui visent une fiche supprimée");
    it.todo("retire les statuts exigés par les liens qui visent une fiche supprimée");
    it.todo("retire les alertes voulues qui visent le nœud supprimé");
});