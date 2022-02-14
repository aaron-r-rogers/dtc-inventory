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
            (NULLIF(($1 :: DECIMAL), 0)),
            (NULLIF(($2 :: DECIMAL), 0)),
            (NULLIF(($3 :: DECIMAL), 0)),
            (NULLIF(($4 :: DECIMAL), 0)),
            (NULLIF(($5 :: DECIMAL), 0)),
            (NULLIF(($6 :: DECIMAL), 0)),
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
    .then(dbRes => {
        console.log('dbRes is:', dbRes)
        // returned id is generated in DB by 
        // default as serial primary key
        const newItemId = dbRes.rows[0].id

        const secondQueryText = `
            WITH junction_images AS
            (INSERT INTO "image"("path", "furnitureId")
                VALUES ($1, $2))
            INSERT INTO "furnitureMaterials"("materialId", "furnitureId")
            VALUES ((SELECT "material"."id" FROM "material"
            WHERE "material"."name" = $3), $4);
        `;

        const secondQueryParams = [
            req.body.path,
            newItemId,
            req.body.material[0],
            newItemId
        ]

        pool
        .query(secondQueryText, secondQueryParams)
        console.log('secondQueryParams:', secondQueryParams)
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