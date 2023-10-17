const { chains } = require("@hyperbitjs/chains");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const blockchains: any[] = [];
  Object.values(chains).forEach((chain) => {
    // @ts-ignore
    Object.keys(chain).forEach((key) => {
      blockchains.push({
        // @ts-ignore
        chainId: chain[key].id,
        // @ts-ignore
        name: chain[key].name,
        network: key,
        active: true,
      });
    });
  });
  await prisma.blockchain.createMany({
    data: blockchains,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
