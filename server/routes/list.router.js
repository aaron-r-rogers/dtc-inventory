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
    GROUP BY "path", "designer"."name", "category"."name", "furniture"."dateUpdate"
    ORDER BY "dateUpdate" DESC;
    `).then(dbRes => {
        console.log('dbRes.rows is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get list', err);
    })
});

router.get('/:category', (req, res) => {
    console.log('in GET list router');
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
        WHERE "category"."id" = $1
        GROUP BY "path", "designer"."name", "category"."name", "furniture"."dateUpdate"
        ORDER BY "dateUpdate" DESC;
    `;
    const queryParams=[
        req.params.category
    ];
    pool.query(queryText, queryParams)
    .then(dbRes => {
        console.log('dbRes.rows is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get filtered list', err);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;