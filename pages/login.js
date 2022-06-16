import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogin extends PageTemplate {
    constructor() {
        super();
        this.title = 'Login | Server';
    }

    mainHTML() {
        return `<div class="row">
        <h1>Login page 🎅</h1>
        </div>`;
    }
}

export { PageLogin };

