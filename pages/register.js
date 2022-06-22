import { PageTemplate } from "../lib/PageTemplate.js";

class PageRegister extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = 'Register | Server';
        this.pageCSSfileName = 'register';
        this.pageJSfileName = 'register';
    }

    mainHTML() {
        return `<div class="row">
        <h1>Register</h1>
        <p>Register to get exited!</p>
        <form class="form" action="/api/account" method="POST">
            <label for="fullname">Fullname</label>
            <input id="fullname" name="fullname" type="text" placeholder="Enter info here..." autocomplete="name" required>
            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Enter info here..." autocomplete="emeil" required>
            <label for="pass">Password</label>
            <input id="pass" name="pass" type="password" placeholder="Enter info here..." autocomplete="new-password" required>
            <label for="repass">Repeat password</label>
            <input id="repass" name="repass" type="password" placeholder="Enter info here..." autocomplete="new-password" required>
            
            <label for="tos">Agree to term and service conditions</label>
            <input type="checkbox" id="tos" required>
            
            <button type="submit">Register</button>
        </form>
        </div>`;
    }
}

export { PageRegister };

