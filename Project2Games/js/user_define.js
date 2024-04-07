function checkUserAlive(){
    let current_user = localStorage.getItem('current_user');
    if(current_user === "null"){
        alert("you log out..");
        window.location.href = "login.html";
    }
    else{
        return JSON.parse(localStorage.getItem(current_user));
    }
}

function saveScore(score, game){
    current_user.info[game +'_score'] = score;
    current_user.info.last_game = game;
    if(parseFloat(localStorage.getItem('best_' + game),10) < score)
        localStorage.setItem('best_' + game, score);

    //save the update user in the local storage
    localStorage.setItem(current_user.user_name, JSON.stringify(current_user));
}