export function createComment(text = ''): Comment {
    return document.createComment(text);
}