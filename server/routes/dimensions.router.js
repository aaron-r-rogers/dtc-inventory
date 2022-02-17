const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in GET dimensions router, req.query', req.query);

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
    WHERE ("dimMinW" BETWEEN $1 AND $2 
        OR ("dimMaxW" != 0 AND "dimMaxW" BETWEEN $1 AND $2))
        AND ("dimMinD" BETWEEN $3 AND $4 
        OR ("dimMaxD" != 0 AND "dimMaxD" BETWEEN $3 AND $4))
        AND ("dimMinH" BETWEEN $5 AND $6
        OR ("dimMaxH" != 0 AND "dimMaxH" BETWEEN $5 AND $6))
    GROUP BY "furniture"."id", "path", "designer"."name", "dateUpdate", "category"."name"
    ORDER BY "dateUpdate" DESC;
    `;

    const queryParams = [
        req.query.minW,
        req.query.maxW,
        req.query.minD,
        req.query.maxD,
        req.query.minH,
        req.query.maxH,
    ];

    pool.query(queryText, queryParams)
    .then(dbRes => {
        console.log('dbRes.rows dimensions is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get dimensions', err);
        res.sendStatus(500);
    })
});

module.exports = router;