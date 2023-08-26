const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { decryptFun, encryptFun } = require("../util/crypto");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const { Op, where, Sequelize } = require("sequelize");

const { CommunityPost, User, CommunityComment, CommunityPostLike, CommunityCommentLike } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.get("/all/:sort", async (req, res) => {
  const { sort } = req.params;

  try {
    if (sort === "최신순") {
      const posts = await CommunityPost.findAll({
        order: [["createdAt", "DESC"]],
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
    } else {
      const posts = await CommunityPost.findAll({
        attributes: ["id", "title", "createdAt", [Sequelize.fn("COUNT", Sequelize.col("CommunityPostLikes.id")), "likeCount"]],
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
        group: ["CommunityPost.id"],
        order: [
          ["likeCount", "DESC"],
          ["createdAt", "DESC"],
        ],
      });
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/one/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const postData = await CommunityPost.findOne({
      where: { id: postId },
      attributes: ["id", "title", "content", "createdAt", "updatedAt"],
      include: [
        { model: User, attributes: ["nickName", "id", "profileImg"] },
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
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
  }
});

router.post("/post", isLoggedIn, async (req, res) => {
  const { email, title, contents } = req.body;
  try {
    await CommunityPost.create({
      email: email,
      title: title,
      content: contents,
    });

    res.status(201).send("성공");
  } catch (err) {
    console.error(err);
  }
});

// 글 삭제
router.delete("/delete/:postId", isLoggedIn, async (req, res) => {
  const { postId } = req.params;
  try {
    const deleteData = await CommunityPost.destroy({ where: { id: postId } });

    if (deleteData) {
      return res.status(201).send("삭제 완료");
    } else {
      return res.status(202).send("Post데이터가 없습니다.");
    }
  } catch (err) {
    console.error(err);
  }
});

// 글 수정
router.get("/modify/get/:postId/:userEmail", isLoggedIn, async (req, res) => {
  const { postId, userEmail } = req.params;
  try {
    const postData = await CommunityPost.findOne({
      where: { id: postId, email: userEmail },
      attributes: ["id", "title", "content", "email"],
    });
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
  }
});
router.patch("/modify/save", isLoggedIn, async (req, res) => {
  const { postId, email, title, contents } = req.body;
  try {
    const testData = await CommunityPost.findOne({ where: { id: postId } });
    if (!testData) {
      return res.status(202).send("실패");
    }

    await CommunityPost.update(
      {
        title: title,
        content: contents,
      },
      { where: { id: postId, email: email } }
    );
    res.status(201).send("성공");
  } catch (err) {
    console.error(err);
  }
});

// 좋아요
router.post("/post/like", isLoggedIn, async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const test = await CommunityPostLike.findOne({ where: { UserId: userId, PostId: postId } });

    if (test) {
      return res.status(202).send("이미 눌려져 있는 좋아요");
    } else {
      const createData = await CommunityPostLike.create({
        UserId: userId,
        PostId: postId,
      });

      const findData = await CommunityPostLike.findOne({ where: { id: createData.id }, attributes: ["id", "UserId"] });
      res.status(201).json(findData);
    }
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete/like/:likeId", isLoggedIn, async (req, res) => {
  const { likeId } = req.params;

  try {
    const deleteData = await CommunityPostLike.destroy({ where: { id: likeId } });

    if (deleteData) {
      return res.status(201).send("삭제 완료");
    } else {
      return res.status(202).send("눌러진 좋아요가 없습니다.");
    }
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
