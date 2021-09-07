import faker from 'faker'

import { AuthenticateUser } from '@/domain/use-cases'

export const mockAuthParams = (): AuthenticateUser.Params => ({
  username: faker.internet.userName(),
  password: faker.internet.password()
})
