function convertIDToInt(requestParams, context, ee, next) {
    requestParams.json.id = parseInt(requestParams.json.id)
    return next();
}

module.exports = {
  convertIDToInt
}