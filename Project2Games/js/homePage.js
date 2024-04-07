
var current_user = checkUserAlive();
document.querySelector('.logout').addEventListener('click', exit);
initialize();

function initialize(){
    //hi for current user
    document.getElementById('hi_user').textContent = 'Hi, ' + current_user.user_name;

    //add image of the last game
    let last_game = current_user.info.last_game;
    let last_game_img = document.createElement("img");
    last_game_img.src = '../images/' + last_game + '.jpg';
    document.getElementById('last_game_info').append(last_game_img);

    //add last date
    document.getElementById('last_date').textContent = new Date(current_user.info.last_visit).toDateString();

    //add scores
    document.getElementById('your_score').innerHTML += " " + current_user.info[last_game + '_score'];
    document.getElementById('best_score').innerHTML += " " + localStorage.getItem('best_' + last_game);
}

function exit(){
    current_user.info.last_visit = new Date();
    localStorage.setItem(current_user.user_name, JSON.stringify(current_user));
    localStorage.setItem('current_user',null)
}