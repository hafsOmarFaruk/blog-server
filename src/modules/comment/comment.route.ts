import { Router } from "express";
import { auth } from "../../middleware/auth";
import { commentController } from "./comment.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.createComment,
);

router.get("/author/:authorId", commentController.getCommentByAuthorId);

router.get("/:postId", commentController.getCommentByCommentId);

router.patch(
  "/:commentId",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  commentController.updateComment,
);

router.delete(
  "/:commentId",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.deleteComment,
);

router.patch(
  "/:commentId/modarate",
  auth(Role.ADMIN),
  commentController.moderateComment,
);

export const commentRoutes = router;
