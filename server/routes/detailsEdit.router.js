const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/', (req, res) => {
    
    const queryText = `
        UPDATE "furniture"
        SET "dimMinW" = $1,
            "dimMinD" = $2,
            "dimMinH" = $3,
            "dimMaxW" = $4,
            "dimMaxD" = $5,
            "dimMaxH" = $6,
            "comments" = $7,
            "categoryId" = (SELECT "id" FROM "category"
		        WHERE "category"."name" = $8),
            "designerId" = (SELECT "id" FROM "designer"
            WHERE "designer"."name" = $9)
        WHERE "furniture"."id" = $10;
    `;

    const queryParams = [
        Number(req.body.dimMinW),
        Number(req.body.dimMinD),
        Number(req.body.dimMinH),
        Number(req.body.dimMaxW),
        Number(req.body.dimMaxD),
        Number(req.body.dimMaxH),
        req.body.comments,
        req.body.category,
        req.body.designer,
        req.body.furnitureId
    ]

    pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log('Edit furniture/details failed: ', err);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    
    const queryText = `
        INSERT INTO "furnitureMaterials"("furnitureId", "materialId")
        VALUES ($1, (SELECT "material"."id" FROM "material"
        WHERE "material"."name" = '$2'));
    `;

    const queryParams = [
        req.body.furnitureId,
        req.body.material
    ]

    pool
    .query(queryText, queryParams)
    .then((dbRes) => {
            console.log(`Added item database`);
            res.sendStatus(201); 
        })
        .catch((error) => {
            console.log(`Error adding item to database`);
            res.sendStatus(500);
        })
});

module.exports = router;