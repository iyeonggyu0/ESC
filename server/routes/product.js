const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { decryptFun, encryptFun } = require("../util/crypto");
const { sendEmail } = require("../mailer/mail");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { Op } = require("sequelize");

const { Product, ProductReview, User, UserProductReviewLike, ProductDiscount } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const data = await Product.create({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      img: req.body.img,
      detailedImg: req.body.detailedImg,
    });
    res.status(201).send("상품 생성:" + data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/get/all/:filter/:sort", async (req, res) => {
  const { filter } = req.params;
  const { sort } = req.params;

  let order;
  let orderSort;
  if (sort === "인기") {
    order = "sale";
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

  try {
    if (filter === "ALL") {
      const data = await Product.findAll({ order: [[order, orderSort]], include: [{ model: ProductDiscount, attributes: ["id", "ProductId", "discountAmount", "periodYear", "periodMonth", "periodDate"] }], attributes: ["img", "grade", "id", "name", "price"] });
      res.status(201).send(data);
    } else {
      const data = await Product.findAll({
        where: {
          type: filter,
        },
        attributes: ["img", "grade", "id", "name", "price"],
        order: [[order, orderSort]],
        include: [{ model: ProductDiscount, attributes: ["id", "ProductId", "discountAmount", "periodYear", "periodMonth", "periodDate"] }],
      });
      res.status(201).send(data);
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/get/one/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const oneData = await Product.findOne({
      where: { id: productId },
      include: [
        {
          model: ProductDiscount,
          attributes: ["id", "ProductId", "discountAmount", "periodYear", "periodMonth", "periodDate"],
        },
      ],
    });

    res.status(201).send(oneData);
  } catch (err) {
    console.error(err);
  }
});

router.get("/get/best", async (req, res) => {
  try {
    const dataProdut = await Product.findAll({
      attributes: ["name", "type", "img", "id"],
      order: [["sale", "DESC"]],
      limit: 3,
      where: { type: { [Op.ne]: "KEYBOARD" } },
    });

    const dataKeyboard = await Product.findAll({
      attributes: ["name", "type", "img", "id"],
      order: [["sale", "DESC"]],
      limit: 3,
      where: { type: "KEYBOARD" },
    });
    return res.status(201).json({ bestProduct: dataProdut, bestKeyboard: dataKeyboard });
  } catch (err) {
    console.error(err);
  }
});

router.delete("/delete/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const oneData = await Product.findOne({
      where: { id: productId },
    });
    if (oneData) {
      fs.rmdirSync(`../client/public/img/product/${oneData.name}`, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
  await ProductDiscount.destroy({ where: { ProductId: productId } });
  const deletedCount = await Product.destroy({ where: { id: productId } });
  if (!deletedCount) {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

router.put("/put", async (req, res) => {
  const productId = req.body.productId;
  const productNewData = req.body.productNewData;
  const newProductDiscount = req.body.newProductDiscount;

  const data = await Product.findOne({
    where: { id: productId },
  });

  if (!data) {
    return res.status(402).send("productId값과 일치하는 상품이 없습니다.");
  }
  try {
    if (data.name !== productNewData.name) {
      await Product.update(
        {
          name: productNewData.name,
        },
        { where: { id: productId } }
      );
      fs.rename(`../client/public/img/product/${data.name}`, `../client/public/img/product/${productNewData.name}`, (err) => {
        if (err) throw err;
        console.log("success!");
      });
    }

    if (productNewData.img !== null) {
      fs.rmdir(`../client/public${data.img}`, { recursive: true }, (err) => {
        console.log("err : ", err);
      });
      await Product.update(
        {
          img: `/img/product/${productNewData.name}/${productNewData.img}`,
        },
        { where: { id: productId } }
      );
    }

    if (productNewData.detailedImg !== null) {
      fs.rmdir(`../client/public${data.detailedImg}`, { recursive: true }, (err) => {
        console.log("err : ", err);
      });
      await Product.update(
        {
          detailedImg: `/img/product/${productNewData.name}/${productNewData.detailedImg}`,
        },
        { where: { id: productId } }
      );
    }

    if (data.type !== productNewData.type) {
      await Product.update(
        {
          type: productNewData.type,
        },
        { where: { id: productId } }
      );
    }

    if (data.price !== productNewData.price) {
      await Product.update(
        {
          price: productNewData.price,
        },
        { where: { id: productId } }
      );
    }

    // 쿠폰
    const discountData = await ProductDiscount.findOne({
      where: { productId: productId },
    });

    if (newProductDiscount.discount === false) {
      await ProductDiscount.destroy({ where: { ProductId: productId } });
    }

    if (newProductDiscount.discount) {
      if (!discountData) {
        await ProductDiscount.create({
          ProductId: productId,
          discountAmount: newProductDiscount.discountAmount,
          periodYear: newProductDiscount.year,
          periodMonth: newProductDiscount.month,
          periodDate: newProductDiscount.date,
        });
      } else if (discountData) {
        await ProductDiscount.update(
          {
            discountAmount: newProductDiscount.discountAmount,
            periodYear: newProductDiscount.year,
            periodMonth: newProductDiscount.month,
            periodDate: newProductDiscount.date,
          },
          { where: { ProductId: productId } }
        );
      }
    }

    res.status(201).send("수정 완료:");
  } catch (err) {
    console.error(err);
  }
});

// 할인 삭제
router.delete("/discount/delete/:id", async (req, res) => {
  const { id } = req.params;
  await ProductDiscount.destroy({ where: { id: id } });
});

// 리뷰
router.post("/review/post", isLoggedIn, async (req, res, next) => {
  try {
    const reviewPost = await ProductReview.create({
      productId: req.body.productId,
      reviewerEmail: req.body.reviewerEmail,
      reviewerGrade: req.body.reviewerGrade,
      content: req.body.content,
    });
    res.status(201).send("리뷰 포스트:" + reviewPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 인기: popularity
// 최신: recent

router.get("/review/get/:productId/:sort", async (req, res) => {
  const { productId } = req.params;
  const { sort } = req.params;

  let order;
  let orderSort;
  if (sort === "인기순") {
    order = "reviewLike";
    orderSort = "DESC";
  }

  if (sort === "최신순") {
    order = "reviewerGrade";
    orderSort = "DESC";
  }

  try {
    const oneData = await ProductReview.findAll({
      where: { productId: productId },
      order: [[order, orderSort]],
      include: [
        {
          model: User,
          attributes: ["nickName", "profileImg", "email"],
        },
      ],
    });
    res.status(201).send(oneData);
  } catch (err) {
    console.error(err);
  }
});

router.put("/review/put", async (req, res) => {
  const { reviewId } = req.body;
  const { content } = req.body;
  const { reviewerGrade } = req.body;

  if (content) {
    await ProductReview.update(
      {
        content: content,
      },
      { where: { id: reviewId } }
    );
  }

  if (reviewerGrade) {
    await ProductReview.update(
      {
        reviewerGrade: reviewerGrade,
      },
      { where: { id: reviewId } }
    );
  }
  res.status(201).send("수정 완료");
});

// 댓글 삭제
router.delete("/review/delete/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  try {
    UserProductReviewLike.destroy({
      where: { ProductReviewId: reviewId },
    });

    await ProductReview.destroy({
      where: { id: reviewId },
    });
    res.status(201).send("삭제 완료");
  } catch (err) {
    console.error(err);
  }
});

// 댓글 좋아요
router.post("/review/like", isLoggedIn, async (req, res, next) => {
  const { type } = req.body;
  const { ProductReviewId } = req.body;
  const { UserEmail } = req.body;

  const data = await ProductReview.findOne({
    where: { id: ProductReviewId },
  });

  if (type === "get") {
    try {
      const Data = await UserProductReviewLike.findOne({
        where: {
          ProductReviewId: ProductReviewId,
          UserEmail: UserEmail,
        },
      });
      if (Data) {
        return res.status(201).json({ result: true, like: data.reviewLike });
      }
      if (!Data) {
        return res.status(201).send({ result: false, like: data.reviewLike });
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (type === "add") {
    try {
      await UserProductReviewLike.create({
        ProductReviewId: ProductReviewId,
        UserEmail: UserEmail,
      });
      await ProductReview.update(
        {
          reviewLike: data.reviewLike + 1,
        },
        { where: { id: ProductReviewId } }
      );

      res.status(201).json({ result: true, like: data.reviewLike + 1 });
    } catch (err) {
      console.error(err);
    }
  }
  if (type === "minus") {
    try {
      await UserProductReviewLike.destroy({
        where: { ProductReviewId: ProductReviewId, UserEmail: UserEmail },
      });

      await ProductReview.update(
        {
          reviewLike: data.reviewLike - 1,
        },
        { where: { id: ProductReviewId } }
      );

      res.status(201).json({ result: false, like: data.reviewLike - 1 });
    } catch (err) {
      console.error(err);
    }
  }
});

module.exports = router;
