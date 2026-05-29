export function query<T extends Element>(selector: string, parent: ParentNode = document): T | null {
    return parent.querySelector(selector);
}

export function queryAll<T extends Element>(selector: string, parent: ParentNode = document): T[] {
    return Array.from(parent.querySelectorAll(selector));
}