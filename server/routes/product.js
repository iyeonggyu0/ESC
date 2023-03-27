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

const { Product, ProductReview, User, UserProductReviewLike, ProductDiscount, ProductInquiry, ProductAnswer, ProductTag, ProductImg } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const productReview = require("../models/productReview");

router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    const data = await Product.create({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      detailedImg: req.body.detailedImg,
      inventoryQuantity: req.body.inventoryQuantity,
    });

    for (let i = 0; i < req.body.imgArr?.length; i++) {
      if (req.body.imgArr[i] === req.body.mainImg) {
        await ProductImg.create({
          productId: data.id,
          img: `/img/product/${data.name}/${req.body.imgArr[i]}`,
          type: "main",
        });
      } else if (req.body.imgArr[i] === req.body.detailedImg) {
        await ProductImg.create({
          productId: data.id,
          img: `/img/product/${data.name}/${req.body.imgArr[i]}`,
          type: "detailedImg",
        });
      } else {
        await ProductImg.create({
          productId: data.id,
          img: `/img/product/${data.name}/${req.body.imgArr[i]}`,
          type: "assist",
        });
      }
    }

    for (let i = 0; i < req.body.tag?.length; i++) {
      await ProductTag.create({
        productId: data.id,
        tag: req.body.tag[i],
      });
    }

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
  if (sort === "재고 순") {
    order = "inventoryQuantity";
    orderSort = "DESC";
  }
  if (sort === "재고 적은 순") {
    order = "inventoryQuantity";
    orderSort = "ASC";
  }

  try {
    if (filter === "ALL") {
      const data = await Product.findAll({
        order: [[order, orderSort]],
        include: [
          {
            model: ProductDiscount,
            attributes: ["id", "ProductId", "discountAmount", "periodYear", "periodMonth", "periodDate"],
          },
          { model: ProductTag },
          { model: ProductImg, where: { type: "main" } },
        ],
        attributes: ["grade", "id", "name", "price", "inventoryQuantity", "type"],
      });
      res.status(201).send(data);
    } else {
      const data = await Product.findAll({
        where: {
          type: filter,
        },
        attributes: ["grade", "id", "name", "price", "inventoryQuantity", "type"],
        order: [[order, orderSort]],
        include: [
          { model: ProductDiscount, attributes: ["id", "ProductId", "discountAmount", "periodYear", "periodMonth", "periodDate"] },
          { model: ProductImg, where: { type: "main" } },
        ],
      });
      res.status(201).send(data);
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/get/one/:productId/:reviewSort", async (req, res) => {
  const { productId } = req.params;
  const { reviewSort } = req.params;

  let order;
  let orderSort;
  if (reviewSort === "인기순") {
    order = "reviewLike";
    orderSort = "DESC";
  }

  if (reviewSort === "최신순") {
    order = "reviewerGrade";
    orderSort = "DESC";
  }

  try {
    const reviewData = await ProductReview.findAll({ where: { ProductId: productId } });
    let gradeNum;
    if (reviewData) {
      let num = 0;
      if (reviewData.length !== 0) {
        for (let i = 0; i < reviewData.length; i++) {
          num = num + reviewData[i].reviewerGrade;
        }
        gradeNum = num / reviewData.length;
      }
    }

    const oneData = await Product.findOne({
      where: { id: productId },
      include: [
        {
          model: ProductTag,
          attributes: ["tag"],
        },
        {
          model: ProductDiscount,
          attributes: ["id", "ProductId", "discountAmount", "periodYear", "periodMonth", "periodDate"],
        },
        { model: ProductImg },
        {
          model: ProductReview,
          order: [[order, orderSort]],
          include: [
            {
              model: User,
              attributes: ["nickName", "profileImg", "email"],
            },
          ],
        },
      ],
    });

    if (gradeNum !== oneData.grade) {
      await Product.update({ grade: gradeNum }, { where: { id: productId } });
      const data = await Product.findOne({
        where: { id: productId },
        include: [
          {
            model: ProductTag,
            attributes: ["tag"],
          },
          {
            model: ProductDiscount,
            attributes: ["id", "ProductId", "discountAmount", "periodYear", "periodMonth", "periodDate"],
          },
          { model: ProductImg },
          {
            model: ProductReview,
            order: [[order, orderSort]],
            include: [
              {
                model: User,
                attributes: ["nickName", "profileImg", "email"],
              },
            ],
          },
        ],
      });
      return res.status(201).send(data);
    }
    res.status(201).send(oneData);
  } catch (err) {
    console.error(err);
  }
});

router.get("/get/best", async (req, res) => {
  try {
    const dataProdut = await Product.findAll({
      attributes: ["name", "type", "id", "inventoryQuantity"],
      order: [["sale", "DESC"]],
      limit: 3,
      where: { type: { [Op.ne]: "KEYBOARD" } },
      include: [{ model: ProductImg, where: { type: "main" } }],
    });

    const dataKeyboard = await Product.findAll({
      attributes: ["name", "type", "id", "inventoryQuantity"],
      order: [["sale", "DESC"]],
      limit: 3,
      where: { type: "KEYBOARD" },
      include: [{ model: ProductImg, where: { type: "main" } }],
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
      include: [{ model: ProductReview }],
    });
    if (oneData) {
      fs.rmdirSync(`../client/public/img/product/${oneData.name}`, { recursive: true });
    }
  } catch (err) {
    console.error(err);
  }
  await ProductDiscount.destroy({ where: { productId: productId } });
  await ProductInquiry.destroy({ where: { productId: productId } });
  await ProductTag.destroy({ where: { productId: productId } });
  await ProductAnswer.destroy({ where: { productId: productId } });
  await ProductReview.destroy({ where: { productId: productId } });
  await ProductImg.destroy({ where: { productId: productId } });

  const deletedCount = await Product.destroy({ where: { id: productId } });

  if (!deletedCount) {
    res.status(404).send("실패");
  }
  res.status(200).send("삭제");
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

    // FIXME: req.body.ChangeMainImg !== null

    // if (productNewData.img !== null) {
    //   fs.rmdir(`../client/public${data.img}`, { recursive: true }, (err) => {
    //     console.log("err : ", err);
    //   });
    //   await Product.update(
    //     {
    //       img: `/img/product/${productNewData.name}/${productNewData.img}`,
    //     },
    //     { where: { id: productId } }
    //   );
    // }

    // FIXME: req.body.ChangeDetailedImg !== null
    // if (productNewData.detailedImg !== null) {
    //   fs.rmdir(`../client/public${data.detailedImg}`, { recursive: true }, (err) => {
    //     console.log("err : ", err);
    //   });
    //   await Product.update(
    //     {
    //       detailedImg: `/img/product/${productNewData.name}/${productNewData.detailedImg}`,
    //     },
    //     { where: { id: productId } }
    //   );
    // }

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

    await ProductTag.destroy({
      where: { productId: productId },
    });

    for (let i = 0; i < productNewData.tag.length; i++) {
      await ProductTag.create({
        productId: data.id,
        tag: productNewData.tag[i],
      });
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

router.put("/put/inventoryQuantity", async (req, res) => {
  try {
    await Product.update({ inventoryQuantity: req.body.inventoryQuantity }, { where: { id: req.body.id } });
    res.status(200).send("성공");
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

router.put("/review/putProduct", async (req, res) => {
  try {
    const { productId, grade } = req.body;

    await Product.update(
      {
        grade: grade,
      },
      { where: { id: productId } }
    );
    res.status(201).send("수정 완료");
  } catch (err) {
    console.error(err);
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

// Inquiry
router.get("/inquiry/get/:productId/:inquiryType", async (req, res) => {
  const { inquiryType, productId } = req.params;
  try {
    if (inquiryType === "all") {
      const data = await ProductInquiry.findAll({
        where: { productId: productId },
        order: [["createdAt", "DESC"]],
        include: [{ model: ProductAnswer, attributes: ["content", "email", "id"] }],
      });
      res.status(201).send(data);
    } else {
      const data = await ProductInquiry.findAll({
        where: {
          productId: productId,
          inquiryType: inquiryType,
        },
        include: [{ model: ProductAnswer, attributes: ["content", "email", "id"] }],
        order: [["createdAt", "DESC"]],
      });
      res.status(201).send(data);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/inquiry/post/", isLoggedIn, async (req, res) => {
  try {
    const create = await ProductInquiry.create({
      productId: req.body.productId,
      email: req.body.email,
      title: req.body.title,
      secret: req.body.secret,
      content: req.body.content,
      inquiryType: req.body.inquiryType,
    });
    res.status(200).send(create);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/inquiry/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  try {
    await ProductInquiry.destroy({ where: { id: id } });
    res.status(200).send("삭제");
  } catch (err) {
    console.error(err);
  }
});

router.put("/inquiry/put", isLoggedIn, async (req, res) => {
  try {
    await ProductInquiry.update(
      {
        inquiryType: req.body.inquiryType,
        secret: req.body.secret,
        title: req.body.title,
        content: req.body.content,
      },
      { where: { id: req.body.id } }
    );
    res.status(200).send("업데이트");
  } catch (err) {
    console.error(err);
  }
});

router.post("/answer/post", isLoggedIn, async (req, res) => {
  try {
    await ProductAnswer.create({
      productId: req.body.productId,
      inquiryId: req.body.inquiryId,
      email: req.body.email,
      content: req.body.content,
    });
    res.status(200).send("답변완료");
  } catch (err) {
    console.error(err);
  }
});

router.delete("/answer/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  try {
    await ProductAnswer.destroy({
      where: { id: id },
    });
    res.status(200).send("삭제완료");
  } catch (err) {
    console.error(err);
  }
});

router.put("/answer/put", isLoggedIn, async (req, res) => {
  try {
    await ProductAnswer.update(
      {
        content: req.body.content,
      },
      { where: { id: req.body.id } }
    );
    res.status(200).send("수정완료");
  } catch (err) {
    console.error(err);
  }
});

router.post("/tag/post", isLoggedIn, async (req, res) => {
  try {
    await ProductTag.create({
      productId: req.body.productId,
      tag: req.body.tag,
    });
    res.status(200).send("추가완료");
  } catch (err) {
    console.error(err);
  }
});

router.delete("/tag/delete/:id", isLoggedIn, async (req, res) => {
  try {
    await ProductTag.destroy({ where: { id: req.body.id } });
    res.status(200).send("삭제");
  } catch (err) {
    console.error(err);
  }
});

router.post("/tag/ex/post", isLoggedIn, async (req, res) => {
  try {
    await ProductTag.destroy({ where: { id: req.body.id } });
    for (let i = 0; i < req.body.tag.length; i++) {
      await ProductTag.create({
        tag: req.body.tag[i],
        type: "ex",
        productType: req.body.productType,
      });
    }
    res.status(200).send("추가완료");
  } catch (err) {
    console.error(err);
  }
});

router.get("/tag/ex/get", isLoggedIn, async (req, res) => {
  try {
    const COMMON = await ProductTag.findAll({ where: { type: "ex", productType: "COMMON" } });
    const CASE = await ProductTag.findAll({ where: { type: "ex", productType: "CASE" } });
    const PCB = await ProductTag.findAll({ where: { type: "ex", productType: "PCB" } });
    const PLATE = await ProductTag.findAll({ where: { type: "ex", productType: "PLATE" } });
    const SWITCHES = await ProductTag.findAll({ where: { type: "ex", productType: "SWITCHES" } });
    const KEYCAPS = await ProductTag.findAll({ where: { type: "ex", productType: "KEYCAPS" } });
    const KEYBOARD = await ProductTag.findAll({ where: { type: "ex", productType: "KEYBOARD" } });
    const ETC = await ProductTag.findAll({ where: { type: "ex", productType: "ETC" } });

    res.status(200).json({ common: { COMMON }, CASE: { CASE }, PCB: { PCB }, PLATE: { PLATE }, SWITCHES: { SWITCHES }, KEYCAPS: { KEYCAPS }, KEYBOARD: { KEYBOARD }, ETC: { ETC }, data: [{ CASE }, { PCB }, { PLATE }, { SWITCHES }, { KEYCAPS }, { KEYBOARD }, { ETC }, { COMMON }] });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
