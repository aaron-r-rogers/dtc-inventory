const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:search', (req, res) => {
    console.log('in GET search router, req.params:', req.params);

    const queryText = `
    SELECT "furniture"."id", "path", "category"."name" AS "categoryName",
        "designer"."name" AS "designerName",
        ARRAY_AGG("material"."name") AS "material"
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
    WHERE "category"."name" ILIKE $1
        OR "designer"."name" ILIKE $1
        OR "material"."name" ILIKE $1
        OR "furniture"."comments" ILIKE $1
    GROUP BY "furniture"."id", "path", "designer"."name", "dateUpdate", "category"."name"
    ORDER BY "dateUpdate" DESC;
    `;

    const queryParams = [
        '%' + req.params.search + '%'
    ];

    console.log(queryParams);
    pool.query(queryText, queryParams)
    .then(dbRes => {
        console.log('dbRes.rows search is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get search', err);
        res.sendStatus(500);
    })
});

module.exports = router;