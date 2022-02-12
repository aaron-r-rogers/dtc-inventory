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
    WHERE $1 < "dimMinW" AND "dimMinW" < $2
        OR $1 < "dimMaxW" AND "dimMinW" < $2
        AND $3 < "dimMinD" AND "dimMinD" < $4 
        OR $3 < "dimMaxD" AND "dimMinD" < $4
        AND $5 < "dimMinH" AND "dimMinH" < $6
        OR $5 < "dimMaxH" AND "dimMinH" < $6
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