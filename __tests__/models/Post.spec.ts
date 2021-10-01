/**
 * @jest-environment ./src/configs/jest-environment
 */

const { v4: uuid } = require('uuid');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Post model integration tests', () => {
  it('it should create a post', async () => {
    const post = await prisma.post.create({
      data: {
        title: 'Hello Word',
        author: {
          create: {
            email: `${uuid()}@test.com`,
            name: 'Author Test',
          },
        },
      },
    });
    expect(post).toHaveProperty('id');
  });

  it('it should list all posts', async () => {
    const posts = await prisma.post.findMany();
    expect(posts).toHaveLength(1);
  });
});
