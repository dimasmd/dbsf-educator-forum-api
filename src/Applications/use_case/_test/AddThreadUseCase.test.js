const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const mockThreadRepository = new ThreadRepository();
    const mockReturnAddThread = {
      id: 'thread-123',
      title: 'this is title of thread',
      owner: 'user-123',
    };
    mockThreadRepository.addThread = jest.fn(() => Promise.resolve(mockReturnAddThread));
    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    const useCasePayload = {
      title: 'this is title of thread',
      body: 'this is body of thread',
      owner: 'user-123',
    };
    const expectedAddedThread = {
      id: 'thread-123',
      title: 'this is title of thread',
      owner: 'user-123',
    };

    // Action
    const addedThread = await useCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
