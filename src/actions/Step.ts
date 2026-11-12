import type { NodeBase, SheetStatus, Step, StepRole } from "../modele/type";


export function createStep(nodeBase : NodeBase, layer: string, role: StepRole, given: string[], changeStatus: SheetStatus[]): Step {
    return {
        ...nodeBase,
        type: "progression",
        layer,
        role,
        given,
        changeStatus,
    }
}