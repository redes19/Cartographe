import type { Campaign, Layer, Sheet, Step, Node } from "../../modele/types";

export function initializedCampaign(nameOfCampaign : string): Campaign {
    return {
        version: 1,
        name: nameOfCampaign,
        layers: [],
        flags: [],
        nodes: [],
        links: [],
        intendedAlerts: [],
    }
}

export function insertLayerInCampaign(campaign: Campaign, newLayer: Layer): Campaign {
    const updateLayer =  [...campaign.layers, newLayer];

    return {
        ...campaign,
        layers: updateLayer,
    }
}

export function insertNodeInCampaign(campaign: Campaign, newNode: Sheet | Step): Campaign {
    const updateNode = [...campaign.nodes, newNode];

    return {
        ...campaign,
        nodes: updateNode,
    }
}

export function updateNodeInCampaign(campaign: Campaign, updateNode: Node): Campaign {
    const updateNodes = campaign.nodes.map((node) => {
        if(node.id === updateNode.id) {
            return updateNode
        }
        return node;
    })

    return{
        ...campaign,
        nodes: updateNodes
    }
}

export function removeNodeFromCampaign(campaign: Campaign, nodeId: string): Campaign {
    const updateNode = campaign.nodes.filter((node) => {
        if(node.id != nodeId) return node;
    })

    const updateLink = campaign.links.filter((link) => {
        if(link.from !== nodeId && link.to !== nodeId) return link
    })

    return{
        ...campaign,
        nodes: updateNode,
        links: updateLink,
    }
}