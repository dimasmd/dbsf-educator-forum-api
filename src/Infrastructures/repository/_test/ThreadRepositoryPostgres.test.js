const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread', () => {
    it('should persist new thread and return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      const newThread = {
        title: 'this is new thread',
        body: 'this is thread body',
        owner: 'user-123',
      };
      const fakeIdGenerator = () => '123';
      const repository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await repository.addThread(newThread);

      // Assert
      expect(addedThread.id).toEqual('thread-123');
      expect(addedThread.title).toEqual(newThread.title);
      expect(addedThread.owner).toEqual(newThread.owner);
      // check thread is persisted correctly
      const foundThread = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(foundThread).toBeDefined();
      expect(foundThread.id).toEqual('thread-123');
      expect(foundThread.title).toEqual(newThread.title);
      expect(foundThread.owner).toEqual(newThread.owner);
      expect(foundThread.body).toEqual(newThread.body);
      expect(foundThread.date).toBeDefined();
    });
  });
});
