const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('in GET details router, req.params:', req.params);

    const queryText = `
        SELECT "furniture"."id", 
            "path",
            ARRAY_AGG ("material"."name") AS "material",
            "designer"."name" AS "designerName",
            "dimMinW",
            "dimMinD", 
            "dimMinH", 
            "dimMaxW", 
            "dimMaxD", 
            "dimMaxH",  
            ARRAY_AGG ("category"."name") AS "categoryName",
            "furniture"."comments" AS "comments"
        FROM "image"
        JOIN "furniture"
            ON "furniture"."id" = "image"."furnitureId"
        JOIN "designer"
            ON "designer"."id" = "furniture"."designerId"
        JOIN "category"
            ON "category"."id" = "furniture"."categoryId"
        JOIN "furnitureMaterials"
            ON "furnitureMaterials"."furnitureId" = "furniture"."id"
        JOIN "material"
            ON "material"."id" = "furnitureMaterials"."materialId"
        WHERE "furniture"."id" = $1
        GROUP BY "furniture"."id", "path", "designer"."name", "material"."name", "category"."name";
    `;

    const queryParams = [req.params.id];

    pool.query(queryText, queryParams)
    .then(dbRes => {
        console.log('dbRes.rows in details router is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get search', err);
        res.sendStatus(500);
    })
});

module.exports = router;