import type { AssignableElementProperties, ElementProperties } from '../element.ts';
import type { NodeLike } from '../node.ts';

export type HTMLElementProperties<TagName extends keyof HTMLElementTagNameMap> = ElementProperties<HTMLElementTagNameMap[TagName], HTMLElementEventMap>;

export function createHTMLElement<TagName extends keyof HTMLElementTagNameMap>(
    tagName: TagName,
    properties: HTMLElementProperties<TagName> = {},
    children: NodeLike[] = []
): HTMLElementTagNameMap[TagName] {
    const element = document.createElement<TagName>(tagName);
    for (const property in properties) {
        if (property === 'classList') element.classList.add(...properties[property]!);
        else if (property === 'style') Object.assign(element.style, properties[property]);
        else if (property === 'dataset') Object.assign(element.dataset, properties[property]);
        else if (/^on[A-Z][a-z]+$/.test(property)) {
            if (typeof properties[property as `on${Capitalize<keyof HTMLElementEventMap>}`] === 'function') {
                element.addEventListener(property.slice(2).toLowerCase(), properties[property as `on${Capitalize<keyof HTMLElementEventMap>}`] as EventListener);
            }
        }
        else element[property as keyof AssignableElementProperties<HTMLElementTagNameMap[TagName]>] = (properties[property as keyof AssignableElementProperties<HTMLElementTagNameMap[TagName]>] as AssignableElementProperties<HTMLElementTagNameMap[TagName]>[keyof AssignableElementProperties<HTMLElementTagNameMap[TagName]>])!;
    }
    element.append(...children);
    return element;
}