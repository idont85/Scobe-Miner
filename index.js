var counter = 0

function startUp() {
  var initial = +localStorage.getItem("clicks")
  console.log(initial)
  document.getElementById('counter').innerHTML = initial;
  counter = counter + initial

}

function goClick() {
    counter = counter + 1
    document.getElementById("counter").innerHTML = counter;
    localStorage.setItem("clicks", counter);
    var storedClicks = localStorage.getItem("clicks");
    console.log(storedClicks)

}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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