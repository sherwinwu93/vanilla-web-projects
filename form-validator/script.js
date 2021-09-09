const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(input, `${getFieldName(input)} 的长度必须大于${min}`);
  } else if (input.value.trim().length > max) {
    showError(input, `${getFieldName(input)} 的长度必须小于${max}`);
  }
}

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      isRequired = true;
      showError(input, `${getFieldName(input)}不能为空`)
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `邮箱不合法`);
  }
}

function checkPassword(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input1);
    showSuccess(input2);
  } else {
    showError(input2, '两次密码不一致');
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!checkRequired([username, email, password, password2])) {
      checkLength(username, 3, 15);
      checkEmail(email);
      checkLength(password, 6, 25);
      checkPassword(password, password2);
    }
});