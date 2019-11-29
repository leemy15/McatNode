export default {
  get({url, type='GET', data={}}) {
    let token =localStorage.getItem("token");
    return $.ajax({
      url,
      type,
      data,
      headers: {
        'X-Access-Token': token
      },
      success: (result, textStatus, jqXHR) => {
        let token = jqXHR.getResponseHeader('x-access-token')
        if (token) {
          localStorage.setItem("token", token);
        }
        return result
      }
    })
  }
}