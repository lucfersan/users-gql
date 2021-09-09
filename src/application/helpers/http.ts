export type HttpResponse = {
  statusCode: number
  data: any
}

export const ok = (data: object): HttpResponse => ({
  statusCode: 200,
  data
})

export const created = (data: object): HttpResponse => ({
  statusCode: 201,
  data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  data: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  data: 'Internal server error'
})
