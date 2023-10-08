const uploadRoute = require("./upload");
const showRoute = require("./show")

function route (app) {
    app.use('/upload', uploadRoute);
    app.use('/show', showRoute);
}

module.exports = route;