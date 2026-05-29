export type NodeLike = Node | string;

export function clearContent(...nodes: Node[]): void {
    for (const node of nodes) node.textContent = '';
}