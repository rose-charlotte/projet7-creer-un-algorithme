export interface ComponentRender<T> {
    element: HTMLElement;
    updateProps: (updatedProps: Partial<T>) => void;
}
