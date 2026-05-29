import { createFragment } from '../create/fragment.ts';

export function parseSVG(svg: string): DocumentFragment {
    const root = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    root.innerHTML = svg;
    return createFragment(Array.from(root.childNodes));
}