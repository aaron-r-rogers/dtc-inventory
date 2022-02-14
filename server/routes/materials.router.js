const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('in GET materials router');
    pool.query(`
    SELECT ARRAY_AGG("material"."name" 
        ORDER BY "material"."name") AS "materials"
    FROM "material";
    `).then(dbRes => {
        console.log('dbRes.rows material is:', dbRes.rows);
        res.send(dbRes.rows)
    }).catch(err => {
        console.error('err in get material', err);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log('Object.keys(req.body)[0] is', Object.keys(req.body)[0])
    const queryText = `
        INSERT INTO "material"("name")
        VALUES($1);
    `;

    queryParams = [Object.keys(req.body)[0]]

    pool
    .query(queryText, queryParams)
    .then((dbRes) => {
        console.log(`Added material database`);
        res.sendStatus(201); 
    })
    .catch((error) => {
        console.log(`Error adding material to database`);
        res.sendStatus(500);
    })
});

router.delete('/:material', (req, res) => {
    console.log("DELETE material req.params:", req.params);
    const queryText = `
        DELETE FROM "material"
        WHERE "name" = $1;
    `;

    pool
    .query(queryText, [req.params.material])
    .then((result) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`Error on material delete`, error);
        res.sendStatus(500);
    });
});

module.exports = router;