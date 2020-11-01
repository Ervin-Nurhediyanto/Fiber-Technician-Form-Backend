const helpers = {
  response: (res, result, status, err, message, page) => {
    const resultPrint = {}

    if (status === 200) {
      resultPrint.status = 'Success'
    } else {
      resultPrint.status = 'Failed'
    }

    if (message) {
      resultPrint.message = message
    }

    if (page) {
      resultPrint.page = page
      resultPrint.totalItem = result.length
    }

    resultPrint.status_code = status
    resultPrint.result = result
    resultPrint.err = err || null
    return res.status(resultPrint.status_code).json(resultPrint)
  }
}

module.exports = helpers
