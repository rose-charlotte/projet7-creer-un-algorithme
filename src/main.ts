import { buildHeader } from "./components/header";

function buildPage(): HTMLElement {
    const header = buildHeader();

    return header;
}

buildPage();
