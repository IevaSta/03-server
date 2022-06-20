import { PageTemplate } from "../lib/PageTemplate.js";

class PageAccount extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = 'Account | Server';
    }

    mainHTML() {
        return `<div class="row">
        <h1>Account page</h1>
        </div>`;
    }
}

export { PageAccount };

