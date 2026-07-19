const isReviewer = (req, res, next) => {
    if (
        req.session.user &&
        req.session.user.role === 'reviewer'
    ) {
        return next()
    }

    res.redirect('/')

// if you create an error page you can render that instead of redirecting
    // res.render('error.ejs', {
    //     msg: 'You do not have permission to view this page.',
    // })
}

module.exports = isReviewer
