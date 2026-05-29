import type { AssignableElementProperties, ElementProperties } from '../element.ts';
import type { NodeLike } from '../node.ts';

export type SVGElementProperties<TagName extends keyof SVGElementTagNameMap> = ElementProperties<SVGElementTagNameMap[TagName], SVGElementEventMap>;

export function createSVGElement<TagName extends keyof SVGElementTagNameMap>(
    tagName: TagName,
    props: SVGElementProperties<TagName> = {},
    children: NodeLike[] = []
): SVGElementTagNameMap[TagName] {
    const elem = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    for (const prop in props) {
        if (prop === 'classList') elem.classList.add(...props[prop]!);
        else if (prop === 'style') Object.assign(elem.style, props[prop]);
        else if (prop === 'dataset') Object.assign(elem.dataset, props[prop]);
        else if (/^on[A-Z][a-z]+$/.test(prop)) {
            if (typeof props[prop as `on${Capitalize<keyof SVGElementEventMap>}`] === 'function') {
                elem.addEventListener(prop.slice(2).toLowerCase(), props[prop as `on${Capitalize<keyof SVGElementEventMap>}`] as EventListener);
            }
        }
        else elem[prop as keyof AssignableElementProperties<SVGElementTagNameMap[TagName]>] = (props[prop as keyof AssignableElementProperties<SVGElementTagNameMap[TagName]>] as AssignableElementProperties<SVGElementTagNameMap[TagName]>[keyof AssignableElementProperties<SVGElementTagNameMap[TagName]>])!;
    }
    elem.append(...children);
    return elem;
}