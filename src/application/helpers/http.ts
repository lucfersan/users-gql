export type HttpResponse = {
  statusCode: 400
  data: any
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
})
