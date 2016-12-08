angular.module('d2p.config', [])
  .constant('d2pconfig', {
    env: "live",
    dev_url: "http://localhost:5000",
    access_token: "HomeRunAuthToken",
    status_token: "HomeRunStatusToken",
});
