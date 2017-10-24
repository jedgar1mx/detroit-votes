(function(){
  var validateEmail = function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  var submitForm = function submitForm(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    switch (true) {
      case name === '':
        document.getElementById('name').className = 'error';
        break;
      case (email === '') || !validateEmail(email):
        document.getElementById('email').className = 'error';
          break;
      case message === '':
        document.getElementById('message').className = 'error';
        break;
      default:
        document.querySelector('.loading').className = 'loading active';
        console.log('sending email');
        $.ajax({
            data: {'name': name, 'email': email, 'message': message},
            url: 'php/email.php',
            method: 'POST', // or GET
            success: function(msg) {
              console.log(msg);
              document.querySelector('.loading').className = 'loading';
              document.querySelector('#submit-results').innerHTML = 'Your message was sent.';
              document.querySelector('#submit-results').className = 'good';
            }
        });
    }
  };
  var removeErrors = function removeErrors(e){
    e.target.className = '';
  };
  var inputList = document.querySelectorAll('form input');
  for (var i = 0; i < inputList.length; i++) {
    inputList[i].addEventListener('click', function(e){
      removeErrors(e);
    });
  }
  document.querySelector('form textarea').addEventListener('click',function(e){
    removeErrors(e);
  });
  document.getElementById('submit-btn').addEventListener('click', submitForm);
})(window);
