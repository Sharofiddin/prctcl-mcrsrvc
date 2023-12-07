import { Router } from 'express'

function createActions ({
  db
}) {
  function recordViewing (traceId, videoId) {
        return db.then((client) =>
          client("videos")
          .where('id', '=', videoId)
          .increment('view_count')
        );
  }

  return {
    recordViewing
  }
}

function createHandlers ({ actions }) {
  function handleRecordViewing (req, res) {
    return actions
      .recordViewing(req.context.traceId, req.params.videoId)
      .then(() => res.redirect('/'))
  }

  return {
    handleRecordViewing
  }
}

function createRecordViewings ({ 
  db
}) {
  const actions = createActions({
    db
  })
  const handlers = createHandlers({ actions }) 

  const router = Router() 

  router.route('/:videoId').post(handlers.handleRecordViewing) 

  return { actions, handlers, router }
}

export default createRecordViewings