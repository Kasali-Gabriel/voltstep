// import { PrismaClient } from '@/generated/prisma/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

import { PrismaClient } from "@/generated/prisma";

// const prisma = new PrismaClient().$extends(withAccelerate());

// const globalForPrisma = global as unknown as { prisma: typeof prisma };

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// export default prisma;


// db.ts or prismaClient.ts

const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
