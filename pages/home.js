import { PageTemplate } from "../lib/PageTemplate.js";

class PageHome extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = 'Home | Server';
    }

    mainHTML() {
        return `<div class="row main-main">
            <img src="https://i.pinimg.com/564x/52/ac/6f/52ac6f4b3c233b2827959254f1c7f4df.jpg" alt="bbs">
        </div>`;
    }
}

export { PageHome };

