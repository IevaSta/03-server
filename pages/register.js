import { PageTemplate } from "../lib/PageTemplate.js";

class PageRegister extends PageTemplate {
    constructor() {
        super();
        this.title = 'Register | Server';
    }

    mainHTML() {
        return `<div class="row">
        <h1>Register page 🎅</h1>
        </div>`;
    }
}

export { PageRegister };

