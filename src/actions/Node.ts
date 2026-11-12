import type { Avancement, NodeBase } from "../modele/type";


export function CreateNodeBase(id: string, title: string, description: string, noteMj: string, avancement: Avancement): NodeBase {
    return {
        id,
        title,
        description,
        noteMj,
        avancement,
    }
}