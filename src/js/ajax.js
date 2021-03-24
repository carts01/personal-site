export default class Ajax {
  getRepos(url) {
    return new Promise(function(resolve, reject) {
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          return resolve(data);
        })
        .catch(function(err) {
          return reject(err);
        });
    });
  }
}
