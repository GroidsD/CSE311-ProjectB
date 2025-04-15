import express from "express";
import homeController from "../controllers/homeController";
import productController from "../controllers/productController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
  //User
  router.get("/api/getAllUser", userController.getAllUser);
  router.post("/api/createNewUser", userController.createNewUser);
  router.get("/api/deleteUser", userController.deleteUserCRUD);
  router.post("/api/updateUser", userController.updateUserCRUD);
  //Product
  router.get("/api/getAllProduct", productController.getAllProduct);
  router.post("/api/createNewProduct", productController.createNewProduct);
  router.get("/api/deleteProductByID", productController.deleteProductByID);
  router.post("/api/updateProduct", productController.updateProduct);
  //Bill User
  router.get("/api/get-bill-by-user-id", userController.getBillByUserID); //history Cart
  router.get("/api/get-product-by-bill-item", productController.getProductByBillItem); //detail bill
  router.get("/api/get-bill-item-by-bill", productController.getBillItemByBill); //detail bill

  return app.use("/", router);
};

module.exports = initWebRoutes;
