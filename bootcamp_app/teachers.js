const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const myArgs = process.argv.slice(2);
const value = [myArgs[0]];
const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers 
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON student_id = students.id 
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name like $1
ORDER BY teacher; 
`;

pool.query(queryString, value)
  .then(res => {
    res.rows.forEach(res => {
      console.log(`${res.cohort}: ${res.teacher}`);
    });
  });