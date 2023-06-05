const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const { decryptFun, encryptFun } = require("../util/crypto");
const { sendEmail } = require("../mailer/mail");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const { Op, where } = require("sequelize");

const { Product, ProductReview, User, UserProductReviewLike, ProductDiscount, ProductInquiry, ProductAnswer, ProductTag, ProductImg, ProductOption, productReview, ProductOptionProperty, ShoppingBag, Payment, CancelPayment } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const payment = require("../models/payment");

// isLoggedIn
router.post("/create", async (req, res, next) => {
  try {
    const data = await Product.create({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      imgRoute: req.body.imgRoute,
      detailedImg: req.body.detailedImg,
      inventoryQuantity: req.body.inventoryQuantity,
    });

    for (let i = 0; i < req.body.imgArr?.length; i++) {
      if (req.body.img === null) {
        await ProductImg.create({
          productId: data.id,
          type: "main",
        });
      }
      if (req.body.imgArr[i] === req.body.img) {
        await ProductImg.create({
          productId: data.id,
          img: `${req.body.imgArr[i]}`,
          type: "main",
        });
      } else {
        await ProductImg.create({
          productId: data.id,
          img: `${req.body.imgArr[i]}`,
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

    const productOptionArr = req.body.productOption;

    for (const optionData of productOptionArr) {
      const productOptionData = await ProductOption.create({
        productId: data.id,
        optionName: optionData.optionName,
        essential: optionData.essential,
      });
      for (const propertyData of optionData.ProductOptionProperties) {
        await ProductOptionProperty.create({
          productId: data.id,
          ProductOptionId: productOptionData.id,
          property: propertyData.property,
          amount: propertyData.amount,
        });
      }
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
        attributes: ["imgRoute", "grade", "id", "name", "price", "inventoryQuantity", "type"],
      });
      return res.status(201).send(data);
    } else {
      const data = await Product.findAll({
        where: {
          type: filter,
        },
        attributes: ["imgRoute", "grade", "id", "name", "price", "inventoryQuantity", "type"],
        order: [[order, orderSort]],
        include: [
          { model: ProductDiscount, attributes: ["id", "ProductId", "discountAmount", "periodYear", "periodMonth", "periodDate"] },
          { model: ProductImg, where: { type: "main" } },
        ],
      });
      return res.status(201).send(data);
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
    const data = await Product.findOne({
      where: { id: productId },
    });
    if (!data) {
      return res.status(402).send("productId값과 일치하는 상품이 없습니다.");
    }

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
          model: ProductOption,
          include: [
            {
              model: ProductOptionProperty,
            },
          ],
        },
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
            model: ProductOption,
            include: [
              {
                model: ProductOptionProperty,
              },
            ],
          },
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
      // attributes: ["name", "type", "id", "inventoryQuantity","imgRoute"],
      order: [["sale", "DESC"]],
      limit: 3,
      where: { type: { [Op.ne]: "KEYBOARD" } },
      include: [{ model: ProductImg, where: { type: "main" } }],
    });

    const dataKeyboard = await Product.findAll({
      // attributes: ["name", "type", "id", "inventoryQuantity","imgRoute"],
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
      fs.rmdirSync(`../client/public/img/product/${oneData.name.replace(/[^\w\s]/gi, "")}`, { recursive: true });
      fs.rmdirSync(`../client/public/img/product/${oneData.name.replace(/[^\w\s]/gi, "")} copy`, { recursive: true });
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
  await ProductOption.destroy({ where: { productId: productId } });
  await ProductOptionProperty.destroy({ where: { productId: productId } });

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
    }

    if (data.detailedImg !== productNewData.detailedImg) {
      await Product.update(
        {
          detailedImg: productNewData.detailedImg,
        },
        { where: { id: productId } }
      );
    }

    await ProductImg.destroy({ where: { productId: productId } });

    const imgArr = productNewData.imgArr.split(/,/g);

    for (let i = 0; i < imgArr?.length; i++) {
      if (productNewData.img === null) {
        await ProductImg.create({
          productId: data.id,
          type: "main",
        });
      }
      if (imgArr[i] === productNewData.img) {
        await ProductImg.create({
          productId: data.id,
          img: `${imgArr[i]}`,
          type: "main",
        });
      } else {
        await ProductImg.create({
          productId: data.id,
          img: `${imgArr[i]}`,
          type: "assist",
        });
      }

      fsExtra.remove(`../client/public/img/product/${data.imgRoute} copy`, (err) => {
        if (err) {
          console.error(err);
        } else {
          fsExtra.move(`../client/public/img/product/${data.imgRoute}`, `../client/public/img/product/${productNewData.name.replace(/[^\w\s]/gi, "")}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });

      await Product.update(
        {
          imgRoute: productNewData.name.replace(/[^\w\s]/gi, ""),
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

    await ProductTag.destroy({
      where: { productId: productId },
    });

    if (productNewData.tag.length >= 1 && productNewData.tag[0].length >= 1) {
      for (let i = 0; i < productNewData.tag.length; i++) {
        await ProductTag.create({
          productId: data.id,
          tag: productNewData.tag[i],
        });
      }
    }

    // 옵션
    await ProductOption.destroy({ where: { productId: productId } });
    await ProductOptionProperty.destroy({ where: { productId: productId } });

    const productOptionArr = req.body.productOption;

    for (const optionData of productOptionArr) {
      const productOptionData = await ProductOption.create({
        productId: productId,
        optionName: optionData.optionName,
        essential: optionData.essential,
      });
      for (const propertyData of optionData.ProductOptionProperties) {
        await ProductOptionProperty.create({
          productId: productId,
          ProductOptionId: productOptionData.id,
          property: propertyData.property,
          amount: propertyData.amount,
        });
      }
    }

    // 쿠폰
    const discountData = await ProductDiscount.findOne({
      where: { productId: productId },
    });

    if (newProductDiscount.discount === false) {
      await ProductDiscount.destroy({ where: { productId: productId } });
    }

    if (newProductDiscount.discount) {
      if (!discountData) {
        await ProductDiscount.create({
          productId: productId,
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
          { where: { productId: productId } }
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
  await ProductTag.destroy({ where: { productType: req.body.productType, type: "ex" } });
  try {
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

router.post("/shoppingbag/create", isLoggedIn, async (req, res) => {
  const { productId, userEmail, options } = req.body;
  try {
    for (i = 0; i < options?.length; i++) {
      await ShoppingBag.create({
        productId: productId,
        userEmail: userEmail,
        quantity: options[i].productQuantity,
        options: options[i].productOptionCheck,
      });
    }
    res.status(200).send("success");
  } catch (err) {
    console.error(err);
  }
});

router.put("/shoppingbag/put", isLoggedIn, async (req, res) => {
  const { id, userEmail, productQuantity } = req.body;
  try {
    const data = await ShoppingBag.update(
      {
        userEmail: userEmail,
        quantity: productQuantity,
      },
      {
        where: { id: id },
      }
    );

    if (data) {
      res.status(200).send("success");
    } else {
      res.status(400).send("failure");
    }
  } catch (err) {
    console.error(err);
  }
});

// isLoggedIn
router.post("/payment/post", isLoggedIn, async (req, res) => {
  const data = req.body;
  try {
    const createData = await Payment.create({
      userEmail: data.userEmail,
      amountOfPayment: data.amountOfPayment,
      productPrice: data.productPrice,
      discount: data.discount,
      deliveryFee: data.deliveryFee,
      purchaseProductInformation: data.purchaseProductInformation,
    });
    if (createData && data?.shoppingBagId) {
      data.shoppingBagId.map((id) => {
        ShoppingBag.destroy({ where: { id: id } });
      });
    }
    res.status(200).send("저장성공");
  } catch (err) {
    console.error(err);
  }
});

router.get("/payment/get/:email", isLoggedIn, async (req, res) => {
  const { email } = req.params;
  try {
    const userPaymentData2 = await Payment.findAll({
      where: { userEmail: email },
    });

    if (userPaymentData2) {
      const promises2 = await Promise.all(
        userPaymentData2.map(async (obj) => {
          const productId = obj.purchaseProductInformation[0].productId;
          const productData = await Product.findOne({ where: { id: productId } });
          return productData;
        })
      );

      const userPaymentData = userPaymentData2.slice().reverse();
      const promises = promises2.slice().reverse();

      res.status(200).json(encryptFun({ userPaymentData, promises }, process.env.REACT_APP_USER_KEY));
    } else {
      res.status(403).send("구매기록이 존재하지 않습니다.");
    }
  } catch (err) {
    console.error(err);
  }
});

//배송완료
router.put("/payment/deliveryCompleted", isLoggedIn, async (req, res) => {
  const { paymentId } = req.body;

  try {
    const updata = await Payment.update(
      {
        deliveryStatus: "배송완료",
      },
      { where: { id: paymentId } }
    );

    if (updata) res.status(200).json({ message: "배송이 완료되었습니다." });
  } catch (err) {
    console.error(err);
  }
});

// 주문취소
router.post("/payment/cancel", isLoggedIn, async (req, res) => {
  const { id, email, type } = req.body;
  try {
    const deletedPayment = await Payment.findOne({ where: { id: id, userEmail: email } });
    if (deletedPayment) {
      await Payment.destroy({ where: { id: id, userEmail: email } });
      const create = await CancelPayment.create({
        userEmail: email,
        paymentData: deletedPayment.dataValues,
        paymentId: deletedPayment.dataValues.id === id ? id : deletedPayment.id,
        paymentDate: `${deletedPayment.dataValues.createdAt}`,
        cancelType: type,
        processStep: `${type} 접수됨`,
      });
      if (create) res.status(200).send(`${type} 접수됨`);
      else res.status(402).send(`접수 실패`);
    } else {
      return res.status(403).send(`id: ${id}, email: ${email}값과 일치하는 데이터가 존재하지 않습니다. `);
    }
  } catch (err) {
    console.error(err);
  }
});

// 주문 취소 조회
router.get("/cancelPayment/get/:email", isLoggedIn, async (req, res) => {
  const { email } = req.params;
  try {
    const userCancelPaymentData2 = await CancelPayment.findAll({
      where: { userEmail: email },
    });

    if (userCancelPaymentData2) {
      const promises2 = await Promise.all(
        userCancelPaymentData2.map(async (obj) => {
          const productId = obj.paymentData.purchaseProductInformation[0].productId;
          const productData = await Product.findOne({ where: { id: productId } });
          return productData;
        })
      );

      const userCancelPaymentData = userCancelPaymentData2.slice().reverse();
      const promises = promises2.slice().reverse();

      res.status(200).json(encryptFun({ userCancelPaymentData, promises }, process.env.REACT_APP_USER_KEY));
    } else {
      res.status(403).send("취소 내역이 존재하지 않습니다.");
    }
  } catch (err) {
    console.error(err);
  }
});

//어드민 페이지 주문목록 조회
router.get("/admin/payment/get/:sort", isLoggedIn, async (req, res) => {
  const { sort } = req.params;

  try {
    if (sort === "기본") {
      const payments = await Payment.findAll({
        where: {
          deliveryStatus: ["주문접수", "상품 준비 중"],
        },
        order: [["createdAt", "DESC"]],
        defaultScope: {
          order: [["createdAt", "DESC"]],
        },
      });

      if (payments) res.status(200).json(encryptFun(payments, process.env.REACT_APP_USER_KEY));
      else res.status(203).json({ message: "주문접수, 상품 준비중 상태의 주문이 없습니다." });
    } else if (sort === "오늘 주문 건") {
      const now = new Date();
      const start = new Date();
      const end = new Date();

      start.setDate(now.getDate() - 1); // 전날로 설정
      start.setHours(16, 0, 0, 0); // 전날 오후 4시로 설정

      end.setHours(16, 0, 0, 0); // 오늘 오후 4시로 설정

      const payments = await Payment.findAll({
        where: {
          deliveryStatus: ["주문접수", "상품 준비 중"],
          createdAt: {
            [Op.between]: [start, end], // 범위 설정
          },
        },
        order: [["createdAt", "DESC"]],
        // 기본 정렬 옵션을 설정합니다.
        defaultScope: {
          order: [["createdAt", "DESC"]],
        },
      });
      if (payments) res.status(200).json(encryptFun(payments, process.env.REACT_APP_USER_KEY));
      else res.status(203).json({ message: `${start} ~ ${end} 까지의 주문이 없습니다.` });
    } else if (sort === "전체 주문") {
      const payments = await Payment.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (payments) res.status(200).json(encryptFun(payments, process.env.REACT_APP_USER_KEY));
      else res.status(203).json({ message: "주문이 없습니다." });
    }
  } catch (err) {
    console.error(err);
  }
});

//어드민 페이지 상태변경
router.put("/admin/payment/put", isLoggedIn, async (req, res) => {
  const { paymentId, status } = req.body;
  try {
    if (status === "주문접수" || status === "상품 준비 중" || status === "배송중" || status === "재고부족") {
      if (paymentId && status) {
        const num = await Payment.update(
          {
            deliveryStatus: status,
          },
          { where: { id: paymentId } }
        );

        res.status(200).json({ message: "변경되었습니다." });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

// 취소 내역 조회
router.get("/admin/cancelPayment/get/:sort", isLoggedIn, async (req, res) => {
  const { sort } = req.params;

  try {
    if (sort === "기본") {
      const payments = await CancelPayment.findAll({
        where: {
          processStep: ["취소 접수됨", "상품 회수 중"],
        },
        order: [["createdAt", "DESC"]],
        defaultScope: {
          order: [["createdAt", "DESC"]],
        },
      });

      if (payments) res.status(200).json(encryptFun(payments, process.env.REACT_APP_USER_KEY));
      else res.status(203).json({ message: "주문접수, 상품 준비중 상태의 주문이 없습니다." });
    } else if (sort === "오늘 접수 건") {
      const now = new Date();
      const start = new Date();
      const end = new Date();

      start.setDate(now.getDate() - 1); // 전날로 설정
      start.setHours(16, 0, 0, 0); // 전날 오후 4시로 설정

      end.setHours(16, 0, 0, 0); // 오늘 오후 4시로 설정

      const payments = await CancelPayment.findAll({
        where: {
          processStep: ["취소 접수됨", "상품 회수 중"],
          createdAt: {
            [Op.between]: [start, end], // 범위 설정
          },
        },
        order: [["createdAt", "DESC"]],
        // 기본 정렬 옵션을 설정합니다.
        defaultScope: {
          order: [["createdAt", "DESC"]],
        },
      });
      if (payments) res.status(200).json(encryptFun(payments, process.env.REACT_APP_USER_KEY));
      else res.status(203).json({ message: `${start} ~ ${end} 사이의 취소/반품 내역이 없습니다.` });
    } else if (sort === "전체 내역") {
      const payments = await CancelPayment.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (payments) res.status(200).json(encryptFun(payments, process.env.REACT_APP_USER_KEY));
      else res.status(203).json({ message: "취소/반품 내역이 없습니다." });
    }
  } catch (err) {
    console.error(err);
  }
});

//어드민 페이지 상태변경
router.put("/admin/cancelPayment/put", isLoggedIn, async (req, res) => {
  const { paymentId, status } = req.body;
  console.log(paymentId, status);
  try {
    if (status === "상품 회수 중") {
      if (paymentId && status) {
        await CancelPayment.update(
          {
            processStep: status,
            clearStep: false,
          },
          { where: { id: paymentId } }
        );

        return res.status(200).json({ message: "변경되었습니다." });
      }
    } else if (status === "환불 완료") {
      if (paymentId && status) {
        await CancelPayment.update(
          {
            processStep: status,
            clearStep: true,
          },
          { where: { id: paymentId } }
        );
      }
      return res.status(200).json({ message: "환불되었습니다." });
    }
  } catch (err) {
    console.error(err);
  }
});

router.put("/paymane/confirmed", isLoggedIn, async (req, res) => {
  const { paymentId, userEmail } = req.body;
  try {
    const paymentData = Payment.findOne({
      where: { id: paymentId, userEmail: userEmail },
    });

    if (paymentData) {
      if (paymentData.deliveryStatus !== "배송완료" || paymentData.deliveryStatus === "구매확정") {
        res.status(200).json({ message: "배송완료 상태가 아니거나 이미 구매확정 되었습니다." });
      } else if (payment.deliveryStatus === "배송완료") {
        const dataModify = Payment.updata(
          {
            deliveryStatus: "구매확정",
          },
          { where: { id: payment, userEmail: userEmail } }
        );
        if (dataModify) {
          res.status(201).json({ message: "구매확정 하셨습니다." });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
