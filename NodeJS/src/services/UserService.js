import bcrypt from "bcrypt";
import db from "../models/index";
import { raw } from "body-parser";
import { where } from "sequelize";
import user from "../models/user";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
let createNewUser = async (data) => {
  // console.log(data);

  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcryt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcryt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        image: data.image,
        roleId: data.roleId,
      });

      resolve("Ok create a new user successfull");
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInforByID = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve({
          errCode: 1,
          errMessage: " Cannot find user",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserByID = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter: userId",
        });
        return;
      }
      console.log(userId);

      let user = await db.User.findOne({
        where: { id: userId },
      });

      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "User not found",
        });
      } else {
        await user.destroy();
        resolve({
          errCode: 0,
          errMessage: "User deleted successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBillByUserID = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let user = await db.Bill.findOne({
          where: { id: inputId },
          attributes: { exclude: ["password", "image"] },
          include: [
            {
              model: db.Bill,
              as: "bills",
              include: [
                {
                  model: db.Bill_Item,
                  as: "bill_items",
                  include: [
                    {
                      model: db.Product,
                      as: "products",
                    },
                  ],
                },
              ],
            },
          ],
          nest: true,
        });
        // console.log(user.bills[0].bill_item);

        resolve({
          errCode: 0,
          data: user,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInforByID: getUserInforByID,
  updateUserData: updateUserData,
  deleteUserByID: deleteUserByID,
  getBillByUserID: getBillByUserID,
};
