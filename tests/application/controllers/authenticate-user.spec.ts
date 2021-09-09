import { AuthenticateUserController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'
import { badRequest, ok, serverError } from '@/application/helpers'
import { AuthenticationError } from '@/domain/entities/errors'
import { throwError } from '@/tests/domain/mocks'
import { AuthenticateUserSpy, mockAuthParams } from '@/tests/domain/mocks/use-cases'

type SutTypes = {
  sut: AuthenticateUserController
  authenticateUserSpy: AuthenticateUserSpy
}

const makeSut = (): SutTypes => {
  const authenticateUserSpy = new AuthenticateUserSpy()
  const sut = new AuthenticateUserController(authenticateUserSpy)
  return {
    sut,
    authenticateUserSpy
  }
}

describe('AuthenticateUserController', () => {
  it('should return a badRequest if one of the required fields is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      ...mockAuthParams(),
      username: ''
    })
    expect(httpResponse).toEqual(badRequest(new RequiredFieldError('username')))
  })

  it('should call AuthenticateUser with correct values', async () => {
    const { sut, authenticateUserSpy } = makeSut()
    const params = mockAuthParams()
    await sut.handle(params)
    expect(authenticateUserSpy.params).toEqual(params)
  })

  it('should return a serverError if AuthenticateUser throws', async () => {
    const { sut, authenticateUserSpy } = makeSut()
    jest.spyOn(authenticateUserSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAuthParams())
    expect(httpResponse).toEqual(serverError())
  })

  it('should return a badRequest with AuthenticationError if the username or password is incorrect', async () => {
    const { sut, authenticateUserSpy } = makeSut()
    authenticateUserSpy.result = new AuthenticationError()
    const httpResponse = await sut.handle(mockAuthParams())
    expect(httpResponse).toEqual(badRequest(new AuthenticationError()))
  })

  it('should return ok on success', async () => {
    const { sut, authenticateUserSpy } = makeSut()
    const httpResponse = await sut.handle(mockAuthParams())
    expect(httpResponse).toEqual(ok(authenticateUserSpy.result))
  })
})
