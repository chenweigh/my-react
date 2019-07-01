const headers = new Headers({
  "Accept":'application/json',
			"Content-Type":'application/json;charset=utf-8'
})

function get(url){
  let dic = {
    "method":"GET",
    "headers":headers,
  }
  return fetch(url, dic).then(response =>{
    return handleResponse(url, response);
  }).catch(error => {
    //console.error(`Request failed. Url = ${url}. Message = ${error}`)
    return Promise.reject({error: {message: "Request failed."}})
  })
}

function post(url, data) {
  console.log(url, data)
  let dic = {
    "method":"POST",
    "headers":headers,
  }
  if(data){
    dic["body"] = JSON.stringify(data)
  }
  return fetch(url, dic).then(response => {
    return handleResponse(url, response);
  }).catch(error => {
    //console.error(`Request failed. Url = ${url}. Message = ${error}`)
    return Promise.reject({error: {message: "Request failed."}})
  })
}


const handleResponse = (url, response) => {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  } else {
    console.error(`Request failed. Url = ${url}`);
    return Promise.reject({error: { message: "Request failed due to server error" }});
  }
};

export { get, post };
