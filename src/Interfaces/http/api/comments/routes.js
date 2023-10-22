const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{id}/comments',
    handler: (request, h) => handler.postCommentHandler(request, h),
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
