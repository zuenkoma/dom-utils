export type ElementStyles = Partial<CSSStyleDeclaration> & {
    [key: `--${string}`]: string;
};

export type AssignableElementProperties<Elem extends Element> = {
    [Prop in keyof Elem as Prop extends `on${string}` | 'classList' ? never : Elem[Prop] extends Function ? never : (<T>() => T extends { [T in Prop]: Elem[Prop]; } ? 1 : 2) extends (<T>() => T extends { readonly [T in Prop]: Elem[Prop]; } ? 1 : 2) ? never : Prop]?: Elem[Prop];
};

export type ElementProperties<Elem extends Element, EventMap extends { [Name in keyof EventMap as Name & string]: Event; }> = {
    classList?: string[];
    style?: ElementStyles;
    dataset?: Record<string, string>;
} & {
    [Name in keyof EventMap as `on${Capitalize<Name & string>}`]?: (this: Elem, event: EventMap[Name]) => void;
} & AssignableElementProperties<Elem>;

export function observeElementExposure(element: Element, callback: (visible: boolean) => void, signal?: AbortSignal) {
    if (signal?.aborted) return;

    let intersecting = false, visible = false;

    const observer = new IntersectionObserver(entries => {
        const newIntersecting = entries[0].isIntersecting;
        if (newIntersecting !== intersecting) {
            if (newIntersecting) document.addEventListener('visibilitychange', update);
            else document.removeEventListener('visibilitychange', update);
            intersecting = entries[0].isIntersecting;
            update();
        }
    });
    observer.observe(element);

    function update() {
        const newVisible = document.visibilityState === 'visible' && intersecting;
        if (visible !== newVisible) {
            callback(newVisible);
            visible = newVisible;
        }
    }

    if (signal) {
        signal.addEventListener('abort', () => {
            observer.disconnect();
            if (intersecting) document.removeEventListener('visibilitychange', update);
        });
    }
}