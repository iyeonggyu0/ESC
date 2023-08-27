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
    await CommunityPostLike.destroy({ where: { PostId: postId } });
    await CommunityComment.destroy({ where: { postId: postId } });
    await CommunityCommentLike.destroy({ where: { postId: postId } });
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

// 댓글 작성
router.post("/post/comment", isLoggedIn, async (req, res) => {
  const { postId, email, content, sort } = req.body;
  try {
    await CommunityComment.create({
      postId: postId,
      email: email,
      content: content,
    });

    res.status(200).send("성공");
  } catch (err) {
    console.error(err);
  }
});

router.get("/get/comment/:postId/:sort", async (req, res) => {
  const { postId, sort } = req.params;
  try {
    if (sort === "0") {
      const findData1 = await CommunityComment.findAll({
        where: { postId: postId },
        include: [
          { model: User, attributes: ["id", "nickName", "profileImg"] },
          { model: CommunityCommentLike, attributes: ["id", "UserId"] },
        ],
        order: [["createdAt", "DESC"]], // 오래된 데이터가 아래로 가게 정렬
      });
      res.status(200).json(findData1);
    } else if (sort === "1") {
      const findData2 = await CommunityComment.findAll({
        where: { postId: postId },
        include: [
          { model: User, attributes: ["id", "nickName", "profileImg"] },
          { model: CommunityCommentLike, attributes: ["id", "UserId"] },
        ],
        order: [[{ model: CommunityCommentLike, as: "CommunityCommentLikes" }, "id", "DESC"]], // 추천순으로 정렬
      });
      res.status(200).json(findData2);
    }
  } catch (err) {
    console.error(err);
  }
});

// 댓글 수정
router.patch("/modify/comment/save", isLoggedIn, async (req, res) => {
  const { content, commentId } = req.body;
  try {
    await CommunityComment.update({ content: content }, { where: { id: commentId } });
    res.status(200).send("성공");
  } catch (err) {
    console.error(err);
  }
});

// 댓글 좋아요
router.post("/post/comment/like", isLoggedIn, async (req, res) => {
  const { commentId, userId, postId } = req.body;

  try {
    const test = await CommunityCommentLike.findOne({ where: { UserId: userId, CommentId: commentId } });

    if (test) {
      return res.status(202).send("이미 눌려져 있는 좋아요");
    } else {
      const createData = await CommunityCommentLike.create({
        UserId: userId,
        CommentId: commentId,
        postId: postId,
      });

      const findData = await CommunityCommentLike.findOne({ where: { id: createData.id }, attributes: ["id", "UserId"] });
      res.status(201).json(findData);
    }
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete/comment/like/:likeId", isLoggedIn, async (req, res) => {
  const { likeId } = req.params;

  try {
    const deleteData = await CommunityCommentLike.destroy({ where: { id: likeId } });

    if (deleteData) {
      return res.status(201).send("삭제 완료");
    } else {
      return res.status(202).send("눌러진 좋아요가 없습니다.");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
