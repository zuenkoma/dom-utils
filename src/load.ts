import { createHTMLElement, type HTMLElementProperties } from './create/html.ts';

export async function loadImage(src: string, props: Omit<HTMLElementProperties<'img'>, 'src'> = {}): Promise<HTMLImageElement> {
    const image = createHTMLElement('img', { ...props, src });
    await image.decode();
    return image;
}