import '../style_sheets/signup.css';

export function SignIn(){
    return (
        <div id="signUpBox">
            <div id="signUp">
                Username
                <input id="signUpInput" name="myInput" />
                Password
                <input type="password" id="signUpInput" name="myInput" />
                <button id="signUpButton">SIGN IN</button>
            </div>
        </div>
    );
};