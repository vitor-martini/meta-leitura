module.exports = {
  apps: [{
    name: "meta-reading",
    script: "node_modules/.bin/next",
    args: "start",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
};
