function mountRoutes (app, config) {
    app.use('/', config.homeApp.router)
    app.use('/record-viewing', config.recordViewingsApp.router)
    app.use('/register', config.registerUserApp.router)
    }
export default mountRoutes