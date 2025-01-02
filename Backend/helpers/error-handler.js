function errorHandler(err, req, res) {
    if (err.name === 'UnathorizedError') {
        return  res.status(401).json({
            message: 'You are not authorized to access this resource'
        })
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            errors: err.errors
        })
    }

    return res.status(500).json({
        message: 'Internal Server Error',

    })

}