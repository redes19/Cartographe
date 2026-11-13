import type { Progress, NodeBase } from "../../modele/types";


export function createNodeBase(id: string, title: string, description: string, gmNotes: string, progress: Progress): NodeBase {
    return {
        id,
        title,
        description,
        gmNotes,
        progress,
    }
}