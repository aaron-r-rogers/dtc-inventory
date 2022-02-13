const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    
    const firstQueryText = `
        INSERT INTO "furniture"(
            "dimMinW", 
            "dimMinD", 
            "dimMinH", 
            "dimMaxW", 
            "dimMaxD", 
            "dimMaxH", 
            "comments", 
            "categoryId", 
            "designerId")
        VALUES(
            (NULLIF($1, 0)),
            (NULLIF($2, 0)),
            (NULLIF($3, 0)),
            (NULLIF($4, 0)),
            (NULLIF($5, 0)),
            (NULLIF($6, 0)),
            (NULLIF($7, '')),
            (SELECT "category"."id" FROM "category"
                WHERE "category"."name" = $8),
            (SELECT "designer"."id" FROM "designer"
                WHERE "designer"."name" = $9)
            )
        RETURNING "id";
    `;

    const firstQueryParams = [
        req.body.dimMinW,
        req.body.dimMinD,
        req.body.dimMinH,
        req.body.dimMaxW,
        req.body.dimMaxD,
        req.body.dimMaxH,
        req.body.comments,
        req.body.category,
        req.body.designer
    ]

    pool
    .query(firstQueryText, firstQueryParams)
    console.log('firstQueryParams:', firstQueryParams)
    .then(result => {
        // returned id is generated in DB by 
        // default as serial primary key
        const newItemId = result.rows[0].id

        const secondQueryText = `
            WITH junction_images AS
            (INSERT INTO "image"("path", "furnitureId")
                VALUES ($1, $2))
            INSERT INTO "furnitureMaterials"("furnitureId", "materialId")
            VALUES ($3, (SELECT "material"."id" FROM "material"
            WHERE "material"."name" = $4));
        `;

        const secondQueryParams = [
            req.body.path,
            newItemId,
            newItemId,
            req.body.material
        ]

        pool
        .query(secondQueryText, secondQueryParams)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            // second query catch
            console.log('Add item second query failed: ', err);
            res.sendStatus(500)
        })

    }) // first query catch
    .catch((err) => {
        console.log('Add item first query failed: ', err);
        res.sendStatus(500);
    });
});

module.exports = router;