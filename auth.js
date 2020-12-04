//AUTH.js
//Check user logged in
chrome.runtime.sendMessage({command: "checkAuth"}, (response) => {
  console.log(response);
  if(response.status == 'success'){
    document.querySelector('.loggedInArea').style.display='block';
    document.querySelector('.loggedInArea span').innerHTML = response.message.uid;
  }else{
    document.querySelector('.loginArea').style.display='block';
  }
});

document.querySelector('.login-btn-auth').addEventListener('click', function(){
  loginFunc();
});
document.querySelector('.logout-btn-auth').addEventListener('click', function(){
  logoutFunc();
});

var loginFunc = function(){
  //Get login details from form...
  var e = document.querySelector('.loginArea input[type="email"]').value;
  var p = document.querySelector('.loginArea input[type="password"]').value;
  chrome.runtime.sendMessage({command: "loginUser", data:{e: e, p: p}}, (response) => {
    console.log(response);
    document.querySelector('.loginArea').style.display='none';
    document.querySelector('.loggedInArea').style.display='none';
    if(response.status == 'success'){
      document.querySelector('.loggedInArea').style.display='block';
      document.querySelector('.loggedInArea span').innerHTML = response.message.uid;
    }else{
      //add Errors
      document.querySelector('.loginArea').style.display='block';
    }
  });
}

var logoutFunc = function(){
  document.querySelector('.loggedInArea').style.display='none';
  document.querySelector('.loginArea').style.display='block';
  chrome.runtime.sendMessage({command: "logoutAuth"}, (response) => {
    //logout..
    console.log(response);
  });
}
