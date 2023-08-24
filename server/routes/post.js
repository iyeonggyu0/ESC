const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { decryptFun, encryptFun } = require("../util/crypto");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const { Op, where } = require("sequelize");

const { CommunityPost, User, CommunityComment, CommunityPostLike, CommunityCommentLike } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/all/:sort", async (req, res) => {
  const { sort } = req.params;
  if (sort === "최신순") {
    order = "createdAt";
    orderSort = "DESC";
  }
  if (sort === "가격 높은 순") {
    order = "price";
    orderSort = "DESC";
  }
  if (sort === "가격 낮은 순") {
    order = "price";
    orderSort = "ASC";
  }
  if (sort === "추천") {
    order = "like";
    orderSort = "DESC";
  }
  if (sort === "별점") {
    order = "grade";
    orderSort = "DESC";
  }
  if (sort === "재고 순") {
    order = "inventoryQuantity";
    orderSort = "DESC";
  }
  if (sort === "재고 적은 순") {
    order = "inventoryQuantity";
    orderSort = "ASC";
  }

  try {
    const posts = await CommunityPost.findAll({
      order: [[order, orderSort]],
      attributes: ["id", "title", "createdAt"],
      include: [
        { model: User, attributes: ["nickName"] },
        {
          model: CommunityPostLike,
          attributes: ["id", "UserId"],
        },
        {
          model: CommunityComment,
          include: [{ model: CommunityCommentLike, attributes: ["id", "UserId"] }],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
  }
});

router.post("/post", isLoggedIn, async (req, res) => {
  const { email, title, contents } = req.body;
  try {
    const post = await CommunityPost.create({
      email: email,
      title: title,
      content: contents,
    });

    const postData = await CommunityPost.findOne({
      where: { id: post.id },
      include: [
        { model: User, attributes: ["nickName"] },
        {
          model: CommunityPostLike,
          attributes: ["id", "UserId"],
        },
        {
          model: CommunityComment,
          include: [{ model: CommunityCommentLike, attributes: ["id", "UserId"] }],
        },
      ],
    });
    res.status(201).json(postData);
  } catch (err) {
    console.error(err);
  }
});

// router.patch("/:postId", async (req, res, next) => {
//   try {
//     await Post.update(
//       {
//         content: req.body.content,
//       },
//       {
//         where: {
//           id: req.params.postId,
//           UserId: req.user.id,
//         },
//       }
//     );
//     res.status(200).json({
//       postId: parseInt(req.params.postId, 10),
//       content: req.body.content,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// router.delete("/:postId", async (req, res, next) => {
//   try {
//     await Post.destroy({
//       where: {
//         id: req.params.postId,
//         UserId: req.user.id,
//       },
//     });
//     res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// // ex) post요청 localhost:3030/2/comment // body.content
// router.post("/:postId/comment", async (req, res, next) => {
//   try {
//     const comment = await Comment.create({
//       content: req.body.content,
//       PostId: parseInt(req.params.postId, 10),
//       UserId: req.user.id,
//     });
//     const fullComment = await Comment.findOne({
//       where: { id: comment.id },
//       include: [
//         {
//           model: User,
//           attributes: ["id", "name"],
//         },
//         {
//           model: Reply,
//           include: [
//             {
//               model: User,
//               attributes: ["id", "name"],
//             },
//           ],
//         },
//       ],
//     });
//     res.status(201).json(fullComment);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// router.post("/:postId/:commentId/reply", async (req, res, next) => {
//   try {
//     const reply = await Reply.create({
//       content: req.body.content,
//       PostId: parseInt(req.params.postId),
//       CommentId: parseInt(req.params.commentId),
//       UserId: req.user.id,
//     });
//     const fullReply = await Reply.findOne({
//       where: { id: reply.id },
//       include: [
//         {
//           model: User,
//           attributes: ["id", "name"],
//         },
//       ],
//     });
//     res.status(201).json(fullReply);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });
// // delete localhost:3030/2/2 ==> id가 2인 게시글의 id가 2인 댓글 삭제
// router.delete("/:postId/:commentId", async (req, res, next) => {
//   try {
//     await Comment.destroy({
//       where: {
//         id: req.params.commentId,
//         PostId: req.params.postId,
//         UserId: req.user.id,
//       },
//     });
//     res.status(200).json({
//       postId: parseInt(req.params.postId, 10),
//       commentId: parseInt(req.params.commentId, 10),
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

// router.delete("/:postId/:commentId/:replyId", async (req, res, next) => {
//   try {
//     await Reply.destroy({
//       where: {
//         id: req.params.replyId,
//         PostId: req.params.postId,
//         CommentId: req.params.commentId,
//         UserId: req.user.id,
//       },
//     });
//     res.status(200).json({
//       PostId: parseInt(req.params.postId, 10),
//       CommentId: parseInt(req.params.commentId, 10),
//       replyId: parseInt(req.params.replyId, 10),
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// });

module.exports = router;
