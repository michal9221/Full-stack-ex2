// Function to set a cookie with expiration time
function setCookie(user_name) {
    const d = new Date();
    d.setTime(d.getTime() + (10 * 1000));//one min
    let expires = "expires=" + d.toUTCString();
    document.cookie = 'user_name' + "=" + user_name + ";" + expires + ";path=/";
}

// Function to get the value of a cookie
function getCookie() {
    let name = "user_name=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

// Function to check the cookie and perform appropriate action
function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome back " + user);
    // Refresh the cookie expiration time
    setCookie(user);
  } else {
    // Redirect to login page if cookie has expired or does not exist
    window.location.href = "login.html";
  }
}

// Execute checkCookie() when the page loads
window.onload = function() {
  checkCookie();
};

document.addEventListener('mousemove', reloadCookies);
document.addEventListener('keydown', reloadCookies);

function reloadCookies(){
    setCookie(getCookie());
} 