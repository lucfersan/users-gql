import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', (req, res) => {
    return res.send()
  })
}
