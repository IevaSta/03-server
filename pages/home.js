import { PageTemplate } from "../lib/PageTemplate.js";

class PageHome extends PageTemplate {
    constructor() {
        super();
        this.title = 'Home | Server';
    }

    mainHTML() {
        return `<div class="row">
        <h1>Home page 🎅</h1>
        </div>`;
    }
}

export { PageHome };

