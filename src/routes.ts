import { constructPath } from './utils/constructPath'
import { IRoute } from './interfaces/IRoute'

const mockData = [
  {
    id: 1,
    name: 'Sam Fisher',
    age: 50,
    series: 'Splinter Cell' 
  },
  {
    id: 2,
    name: 'James Bond',
    age: 'unknown',
    series: '007' 
  },
]

export const routes: IRoute[] = [
  {
    method: 'GET',
    path: constructPath('/characters'),
    handler: (_, res) => {
      res.send!(200, mockData)
    }
  },
  {
    method: 'GET',
    path: constructPath('/characters/:characterId'),
    handler: (req, res) => {
      const { characterId } = req.pathParams!

      const existingData = mockData.find(character => character.id === Number(characterId))
      
      if (!existingData) {
        res.send!(404, { error: 'Character not found' })
        return 
      }

      res.send!(200, existingData)
    }
  },
]
