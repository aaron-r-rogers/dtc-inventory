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
            "categoryId" = $8,
            "designerId" = $9
        WHERE "furniture"."id" = $10;
    `;

    const queryParams = [
        req.body.dimMinW,
        req.body.dimMinD,
        req.body.dimMinH,
        req.body.dimMaxW,
        req.body.dimMaxD,
        req.body.dimMaxH,
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
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log('Edit furnitureMaterials failed: ', err);
        res.sendStatus(500);
    });
});

module.exports = router;