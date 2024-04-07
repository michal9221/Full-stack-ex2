initialize();

function initialize(){
    document.querySelector('form').addEventListener('submit', logIn);
}

function logIn(){
    let user_name = document.getElementById('user_name').value;
    let password = document.getElementById('password').value;
    var user = JSON.parse(localStorage.getItem(user_name));

    if(user === null){
        document.getElementById('error').textContent = 'WRONG USER NAME';
        event.preventDefault();
        return;
    } 

    if(new Date(user.lock) > new Date()){
        seconds = (new Date(user.lock) - new Date())/(1000);
        alert(`TOO MANY ATTEMPTS, TRY AGAIN IN ${seconds} SECONDS`)
        event.preventDefault();
        return;
    }

    if(user.password !== password){
        document.getElementById('error').textContent = 'WRONG PASSWORD';
        user.attempts += 1;
        localStorage.setItem(user.user_name, JSON.stringify(user));

        if(user.attempts > 2){
            user.lock = new Date(new Date().getTime() + 60 * 1000) //minute
            user.attempts = 0;
            localStorage.setItem(user.user_name, JSON.stringify(user));
        }
        event.preventDefault();
        return;
    }
    
    localStorage.setItem('current_user', user_name);
    user.lock = new Date();
    user.attempts = 0;
    localStorage.setItem(user.user_name, JSON.stringify(user));
}