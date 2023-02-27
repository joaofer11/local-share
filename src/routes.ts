import { constructPath } from './utils/constructPath'

export const routes = [
  {
    method: 'GET',
    path: constructPath('/characters')
  },
  {
    method: 'GET',
    path: constructPath('/characters/:characterId')
  },
]
