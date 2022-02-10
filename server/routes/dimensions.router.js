const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('in GET dimensions router, req.query', req.query);

    const queryText = `
    SELECT "path", "category"."name" AS "categoryName",
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
WHERE "dimMinW" < COALESCE($1, 999)
	AND "dimMinD" < COALESCE($2, 999)
	AND "dimMinH" < COALESCE($3, 999)
GROUP BY "path", "designer"."name", "dateUpdate", "category"."name"
ORDER BY "dateUpdate" DESC;
    `;

    const queryParams = [
        req.query.maxW,
        req.query.maxD,
        req.query.maxH
    ];

    pool.query(queryText, queryParams)
    .then(dbRes => {
        console.log('dbRes.rows dimensions is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get dimensions', err);
    })
});

module.exports = router;