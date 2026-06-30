import { prisma } from "../../lib/prisma";
import {
  ICreateCommentPayload,
  IModerateCommentPayload,
  IUpdateCommentPayload,
} from "./comment.interface";

const createComment = async (
  authorId: string,
  payload: ICreateCommentPayload,
) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  const comment = await prisma.comment.create({
    data: {
      ...payload,
      authorId,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    include: {
      post: {
        select: {
          title: true,
          status: true,
          views: true,
        },
      },
    },
  });

  return comment;
};

const getCommentByAuthorId = async (authorId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      authorId,
    },
    include: {
      post: {
        select: {
          title: true,
          id: true,
        },
      },
    },
  });

  return result;
};

const getCommentByCommentId = async (postId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      postId,
    },
  });
  return result;
};

const updateComment = async (
  commentId: string,
  authorId: string,
  payload: IUpdateCommentPayload,
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  const comment = await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data: payload,
  });

  return comment;
};

const deleteComment = async (commentId: string, authorId: string) => {
  const commentData = await prisma.comment.findFirstOrThrow({
    where: {
      id: commentId,
      authorId,
    },
  });

  const coment = await prisma.comment.delete({
    where: {
      id: commentId,
      authorId,
    },
  });
  return coment;
};

const moderateComment = async (
  commentId: string,
  authorId: string,
  payload: IModerateCommentPayload,
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
  });

  const modarateComment = await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data: payload,
  });
  return modarateComment;
};

export const commentService = {
  createComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
};
