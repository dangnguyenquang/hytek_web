const uploadRoute = require("./upload");
const showRoute = require("./show")
const deleteRoute = require("./delete")

function route (app) {
    app.use('/upload', uploadRoute);
    app.use('/show', showRoute);
    app.use('/delete', deleteRoute);
}

module.exports = route;