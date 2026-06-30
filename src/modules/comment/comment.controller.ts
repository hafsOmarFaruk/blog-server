import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendREsponse } from "../../utils/sendResponse";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const authorId = req.user?.id;
  const result = await commentService.createComment(
    authorId as string,
    req.body,
  );

  sendREsponse(res, {
    success: true,
    message: "comment created successfully",
    statusCode: 201,
    data: result,
  });
});

const getCommentByAuthorId = catchAsync(async (req: Request, res: Response) => {
  const authorId = req.params.authorId;
  const result = await commentService.getCommentByAuthorId(authorId as string);

  sendREsponse(res, {
    success: true,
    message: "get all coment by author successfully",
    statusCode: 200,
    data: result,
  });
});

const getCommentByCommentId = catchAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const result = await commentService.getCommentByCommentId(postId as string);

    sendREsponse(res, {
      success: true,
      message: "get all coment this post successfully",
      statusCode: 200,
      data: result,
    });
  },
);
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const authorId = req.user?.id as string;
  const payload = req.body;

  const result = await commentService.updateComment(
    commentId,
    authorId,
    payload,
  );
  sendREsponse(res, {
    success: true,
    message: "updated coment successfully",
    statusCode: 200,
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const authorId = req.user?.id as string;

  const result = await commentService.deleteComment(commentId, authorId);
  sendREsponse(res, {
    success: true,
    message: "delete coment successfully",
    statusCode: 200,
    data: result,
  });
});

const moderateComment = catchAsync(async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const authorId = req.user?.id as string;
  const payload = req.body;

  const result = await commentService.moderateComment(
    commentId,
    authorId,
    payload,
  );

  sendREsponse(res, {
    success: true,
    message: "delete coment successfully",
    statusCode: 200,
    data: result,
  });
});

export const commentController = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
