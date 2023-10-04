const uploadRoute = require("./upload");

function route (app) {
    app.use('/upload', uploadRoute);
}

module.exports = route;