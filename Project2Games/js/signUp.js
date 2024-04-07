initialize();

//-----------------------------objects-----------------------------
class User {
    constructor(user_name, phone_number, email, password) {
        this.user_name = user_name,
        this.phone_number = phone_number,
        this.email = email,
        this.password = password,
        this.lock = new Date(),
        this.attempts = 0,
        this.info = new Info()
    }
}

class Info {
    constructor() {
        this.last_visit = new Date(),
        this.last_game = 'four_row',
        this.four_row_score = 0,
        this.letters_score = 0
    }
}

//------------------------------initialize------------------------------
function initialize(){
    let sign_up_forn = document.querySelector('form').addEventListener('submit', signUp);
    let authpassword = document.getElementById('authpassword').addEventListener('input', checkAuthPassword);
}

//-----------------------------check password----------------------------
function checkAuthPassword(){
    let password = document.getElementById('password').value;
    let authpassword = document.getElementById('authpassword').value;

    if (password !== authpassword) {
        document.getElementById('authpasswordError').textContent = 'Authority password does not match.';
    } else {
        document.getElementById('authpasswordError').textContent = '';
    }
}

//--------------------------------sign up--------------------------------
function signUp(){ 
    if (document.getElementById('authpasswordError').textContent !== ''){
        event.preventDefault();
        return;
    }
    
    let user_name = document.getElementById('user_name').value;
    let phone_number = document.getElementById('phone_number').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (localStorage.getItem(user_name) !== null) {
        document.getElementById('existError').textContent = 'THIS USER NAME ALREADY EXIST';
        event.preventDefault();
        return;
    }
       
    let MyUser = new User(user_name, phone_number, email, password);
    localStorage.setItem(user_name, JSON.stringify(MyUser));
}