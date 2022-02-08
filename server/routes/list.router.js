const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in GET list router');
    pool.query(`
    SELECT "path", "category"."name" AS "categoryName", 
	"designer"."name" AS "designerName",
	"dimMinW", "dimMinD", "dimMinH",
	"dimMaxW", "dimMaxD", "dimMaxH",
	"dateUpdate", "comments",
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
    GROUP BY "path", "designer"."name", "dateUpdate", "category"."name",
        "dimMinW", "dimMinD", "dimMinH",
        "dimMaxW", "dimMaxD", "dimMaxH", "comments"
    ORDER BY "dateUpdate" DESC;
    `).then(dbRes => {
        console.log('dbRes.rows is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get shelf', err);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;