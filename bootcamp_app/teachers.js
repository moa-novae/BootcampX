const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const myArgs = process.argv.slice(2);

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers 
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON student_id = students.id 
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name like '${myArgs[0] || 'JUL02'}'
ORDER BY teacher; 
`)
  .then(res => {
    res.rows.forEach(res => {
      console.log(`${res.cohort}: ${res.teacher}`);
    });
  });