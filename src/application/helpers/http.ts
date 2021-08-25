export type HttpResponse = {
  statusCode: number
  data: any
}

export const created = (data: object): HttpResponse => ({
  statusCode: 400,
  data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  data: 'Internal server error'
})
