import type { Campaign, Layer, Sheet, Step, Node } from "../modele/type";

export function initializedCampaign(nameOfCampaign : string): Campaign {
    return {
        version: 1,
        campaign: nameOfCampaign,
        layers: [],
        drapeaux: [],
        nodes: [],
        liens: [],
        alerteVoulues: [],
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

export function removeNodeFromCampaign(campaign: Campaign, nodeRemove: Node): Campaign {
    const updateNode = campaign.nodes.filter((node) => {
        if(node.id != nodeRemove.id) return node;
    })

    return{
        ...campaign,
        nodes: updateNode
    }
}