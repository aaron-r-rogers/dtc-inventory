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
            "dateUpdate" = CURRENT_TIMESTAMP(2),
            "categoryId" = (SELECT "id" FROM "category"
                WHERE "category"."name" = $8),
            "designerId" = (SELECT "id" FROM "designer"
            WHERE "designer"."name" = $9)
        WHERE "furniture"."id" = $10;
    `;

    const queryParams = [
        Number(req.body.dimMinW),
        Number(req.body.dimMinD),
        Number(req.body.dimMinH),
        Number(req.body.dimMaxW),
        Number(req.body.dimMaxD),
        Number(req.body.dimMaxH),
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

router.post('/', async (req, res) => {
    try {
    console.log('in detailsEdit post, req.body is:', req.body);
    
    const deleteQueryText = `
        DELETE FROM "furnitureMaterials"
        WHERE "furnitureId" = $1;
    `;

    const deleteQueryParams = [
        Number(req.body.furnitureId),
    ]

    await pool.query(deleteQueryText, deleteQueryParams);

    const insertQueryText = `
        INSERT INTO "furnitureMaterials"("furnitureId", "materialId")
        VALUES ($1, (SELECT "material"."id" FROM "material"
        WHERE "material"."name" = $2));
    `;

    const insertQueryParams = [
        Number(req.body.furnitureId),
        req.body.material[0]
    ]

    await pool.query(insertQueryText, insertQueryParams)
    .then((dbRes) => {
            console.log(`Added item database`);
            res.sendStatus(201); 
        })
        .catch((error) => {
            console.log('Error editing item to database', error);
            res.sendStatus(500);
        })
    }
    catch (error){
        console.log('error in details edit router,', error);
        res.sendStatus(500);
    }
});
module.exports = router;