import { HeaderContainer } from "./components/wcHeader";

class app extends HTMLElement {
    header = new HeaderContainer();
}

customElements.define("app-element", app);
