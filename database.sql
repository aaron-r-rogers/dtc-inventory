
-- table of all registered users
-- authLevel === 'ADMIN' || 'GUEST'
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "authLevel" VARCHAR (10) NOT NULL
);

-- "category" is set from start but can be edited
-- id is FK in "furniture" table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255) UNIQUE NOT NULL
);

-- "designer" is set from start but can be edited
-- id is FK in "furniture" table
CREATE TABLE "designer" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (510) UNIQUE NOT NULL
);

-- id is FK in "image" and "furnitureMaterial"
-- dateUpdate shows time row was added/modified
CREATE TABLE "furniture" (
	"id" SERIAL PRIMARY KEY,
	"dimMinW" DECIMAL (2),
	"dimMinD" DECIMAL (2),
	"dimMinH" DECIMAL (2),
	"dimMaxW" DECIMAL (2),
	"dimMaxD" DECIMAL (2),
	"dimMaxH" DECIMAL (2),
	"comments" VARCHAR (2048),
	"dateUpdate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP(2),
	"categoryId" INTEGER,
	FOREIGN KEY("categoryId")
		REFERENCES "category"("id"),
	"designerId" INTEGER,
	FOREIGN KEY("designerId")
		REFERENCES "designer"("id")
);

-- for base mode, path is relative public/images
CREATE TABLE "image" (
    "id" SERIAL PRIMARY KEY,
    "path" VARCHAR (255) UNIQUE NOT NULL,
    "furnitureId" INTEGER,
    FOREIGN KEY("furnitureId")
        REFERENCES "furniture"("id")
);

-- id is FK in "furnitureMaterial"
CREATE TABLE "material" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (255)
);

-- many to many relationship
CREATE TABLE "furnitureMaterial" (
	"id" SERIAL PRIMARY KEY,
	"materialId" INTEGER,
	FOREIGN KEY ("materialId")
		REFERENCES "material"("id"),
	"furnitureId" INTEGER,
	FOREIGN KEY ("furnitureId")
		REFERENCES "furniture"("id")
);