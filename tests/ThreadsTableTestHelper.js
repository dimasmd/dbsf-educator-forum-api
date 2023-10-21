const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async findThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows[0];
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE TRUE');
  },
};

module.exports = ThreadsTableTestHelper;
