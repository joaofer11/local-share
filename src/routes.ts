import { constructPath } from './utils/constructPath'
import { IRoute } from './interfaces/IRoute'

export const routes: IRoute[] = [
  {
    method: 'GET',
    path: constructPath('/characters'),
    handler: (req, res) => {

    }
  },
  {
    method: 'GET',
    path: constructPath('/characters/:characterId'),
    handler: (req, res) => {
      res.end()
    }
  },
]
