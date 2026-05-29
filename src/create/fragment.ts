import type { NodeLike } from '../node.ts';

export function createFragment(children: NodeLike[] = []): DocumentFragment {
    const fragment = document.createDocumentFragment();
    fragment.append(...children);
    return fragment;
}