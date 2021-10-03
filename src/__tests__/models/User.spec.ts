/**
 * @jest-environment ./src/configs/jest-environment
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User model integration tests', () => {
  it('it should create a user', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Test',
        email: 'test@test.io',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'Test' },
        },
      },
    });
    expect(user).toHaveProperty('id');
  });

  it('it should list all users', async () => {
    const users = await prisma.user.findMany();
    expect(users).toHaveLength(1);
  });
});
