export const userService = {
  getUserInfo,
  exchangeToken,
  goToLoginUrl,
};

function goToLoginUrl() {
  const requestOptions = {
    method: 'GET'
  }
  return fetch(`http://localhost:8000/auth/`, requestOptions)
    .then(response => handleResponse(response, 'go_to_login_url'))
      .then(data => {
        return data.url;
      });
}

function exchangeToken(code) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ 'code': code })
  };
  return fetch(`http://localhost:8000/exchange/`, requestOptions)
    .then(response => handleResponse(response, 'exchange'))
      .then(data => {
        return data.token;
      });
}

function getUserInfo(token) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ 'token': token })
  };
  return fetch(`http://localhost:8000/info/`, requestOptions)
    .then(response => handleResponse(response, 'get_user_info'))
      .then(data => {
        return data.user;
      });
}

function handleResponse(response, api_name) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }
    else {
      switch (api_name) {
        case 'get_user_info':
        case 'exchange':
        case 'go_to_login_url':
          return handleSuccessfulResponse(data);
      }
    }
  });
}

function handleSuccessfulResponse(data) {
  if (data.error == 'error_server') {
    const error = "Error Server";
    return Promise.reject(error);
  } else if (data.error) {
    return Promise.reject("Unknown request!");
  } else {
    return data;
  }
}
