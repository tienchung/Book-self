const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGO_URI
  },
  default: {
    SECRET: "password",
    DATABASE: "mongodb://chung3:chung3@ds137483.mlab.com:37483/bookseft-dev"
  }
};

exports.get = function get(env){
    return config[env] || config.default
}
