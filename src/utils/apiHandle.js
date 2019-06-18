import q from 'q'
import { HTTP } from './axiosProvider'

export function apiHandle(method, path, data = {}, config) {
  const deferred = q.defer()

  if (config) {
    data.params = {
      ...config.params,
      developer: 'Andrey'
    }
  } else {
    config = {
      params: {
        developer: 'Andrey'
      }
    }
  }

  HTTP[method](path, data, config)
    .then(res => {
      deferred.resolve(res)
    })
    .catch(err => {
      deferred.reject(err)
    })
  return deferred.promise
}
