const CreatedComment = require('../CreatedComment');

describe('CreatedComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'abc',
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new CreatedComment(payload))
      .toThrowError('CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: true,
      content: 123,
      owner: {},
    };

    // Action and Assert
    expect(() => new CreatedComment(payload))
      .toThrowError('CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create createdComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'this is a content of comment',
      owner: 'user-123',
    };

    // Action
    const createdComment = new CreatedComment(payload);

    // Assert
    expect(createdComment.id).toEqual(payload.id);
    expect(createdComment.content).toEqual(payload.content);
    expect(createdComment.owner).toEqual(payload.owner);
  });
});
