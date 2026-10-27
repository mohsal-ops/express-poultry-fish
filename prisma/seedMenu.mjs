// Loads the Express Fish and Poultry menu (taken from their DoorDash store) into
// the database: 18 categories, 101 items, photos served from /public/menu.
//
//   npm run seed:menu
//
// Safe to re-run: categories are matched by name and items by slug, so running
// it again updates prices/descriptions/photos instead of creating duplicates.
// Items the owner added by hand are never touched or deleted.

import { createRequire } from "module";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readEnvVar(file, key) {
  try {
    const t = readFileSync(file, "utf8");
    for (const l of t.split(/\r?\n/)) {
      const m = l.match(new RegExp(`^\\s*${key}\\s*=\\s*(.*)$`));
      if (m) return m[1].trim().replace(/^['"]|['"]$/g, "");
    }
  } catch {}
  return null;
}

const dbUrl =
  process.env.DATABASE_URL ||
  readEnvVar(path.join(projectDir, ".env.local"), "DATABASE_URL") ||
  readEnvVar(path.join(projectDir, ".env"), "DATABASE_URL");
if (!dbUrl) {
  console.error("DATABASE_URL not set (env or .env).");
  process.exit(1);
}

const require = createRequire(path.join(projectDir, "package.json"));
const { PrismaClient } = require(path.join(projectDir, "generated", "prisma"));
const { PrismaPg } = require("@prisma/adapter-pg");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: dbUrl }) });

const menu = JSON.parse(readFileSync(path.join(projectDir, "prisma", "data", "menu.json"), "utf8"));

async function main() {
  // The menu lists categories by createdAt, so stamp them one second apart
  // to keep the DoorDash order.
  const base = Date.UTC(2026, 0, 1);
  let items = 0;

  for (const [i, cat] of menu.categories.entries()) {
    const createdAt = new Date(base + i * 1000);
    const existing = await prisma.types.findFirst({
      where: { OR: [{ slug: cat.slug }, { name: { equals: cat.name, mode: "insensitive" } }] },
    });
    const type = existing
      ? await prisma.types.update({ where: { id: existing.id }, data: { name: cat.name, createdAt } })
      : await prisma.types.create({ data: { name: cat.name, slug: cat.slug, createdAt } });

    for (const item of cat.items) {
      const data = {
        name: item.name,
        description: item.description,
        priceInCents: item.priceInCents,
        image: item.image,
        featured: item.featured,
        typeId: type.id,
      };
      await prisma.item.upsert({
        where: { slug: item.slug },
        update: data,
        create: { ...data, slug: item.slug },
      });
      items++;
    }
    console.log(`✓ ${cat.name} (${cat.items.length})`);
  }

  console.log(`\nMenu seeded: ${menu.categories.length} categories, ${items} items.`);
}

main()
  .catch((e) => {
    console.error("SEED FAILED:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
