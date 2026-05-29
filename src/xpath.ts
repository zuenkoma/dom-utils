export function xpathNumber(expression: string, contextNode: Node = document): number {
    const result = document.evaluate(expression, contextNode, null, XPathResult.NUMBER_TYPE);
    return result.numberValue;
}

export function xpathString(expression: string, contextNode: Node = document): string {
    const result = document.evaluate(expression, contextNode, null, XPathResult.STRING_TYPE);
    return result.stringValue;
}

export function xpathBoolean(expression: string, contextNode: Node = document): boolean {
    const result = document.evaluate(expression, contextNode, null, XPathResult.BOOLEAN_TYPE);
    return result.booleanValue;
}

export function xpathFirst<T extends Node>(expression: string, contextNode: Node = document): T | null {
    const result = document.evaluate(expression, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE);
    return result.singleNodeValue as T | null;
}

export function xpathAll<T extends Node>(expression: string, contextNode: Node = document): T[] {
    const result = document.evaluate(expression, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    const nodes: T[] = [];
    for (let i = 0; i < result.snapshotLength; ++i) {
        const node = result.snapshotItem(i);
        if (node) nodes.push(node as T);
    }
    return nodes;
}