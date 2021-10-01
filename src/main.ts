import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser() {
  return prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  });
}

async function getAllUsers() {
  return prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
}

async function updatePost() {
  return prisma.post.updateMany({
    where: {},
    data: { published: true },
  });
}

async function cleanupDb() {
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await cleanupDb();
  await createUser();
  console.dir(await getAllUsers(), { depth: null });
  console.dir(await updatePost());
  console.dir(await getAllUsers(), { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
