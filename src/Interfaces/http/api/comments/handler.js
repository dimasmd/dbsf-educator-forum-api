const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;
  }

  async postCommentHandler(request, h) {
    const { id: owner } = request.auth.credentials;
    const { content } = request.payload;
    const { id: threadId } = request.params;

    const useCase = this._container.getInstance(AddCommentUseCase.name);

    const addedComment = await useCase.execute({
      threadId,
      content,
      owner,
    });

    const response = h.response({
      status: 'success',
      message: 'Komentar berhasil ditambahkan',
      data: {
        addedComment,
      },
    });

    response.code(201);
    return response;
  }
}

module.exports = CommentsHandler;
