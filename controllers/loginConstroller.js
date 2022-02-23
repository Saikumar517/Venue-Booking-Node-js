const UserValidator = require("../utils/validator");
const User = require("../models/userModel");
const _ = require("underscore");
const vm = require("v-response");

exports.CreateAccount = async (req, res, next) => {
  try {
    let obj = req.body;
    const validateUserInput = await UserValidator.validateAccount(obj);
    if (!validateUserInput) {
      return res.status(400).json({
        status: false,
        code: 400,
        message: "There's error in your inputs",
        errors: validateUserInput.errors,
      });
    }
    const checkUserEmail = await User.findOne({ email: req.body.email });
    if (checkUserEmail) {
      return res
        .status(409)
        .json(vm.ApiResponse(false, 409, "email already exist"));
    } else if (!checkUserEmail) {
      _.extend(obj, {
        password: await vm.hashedPassword(obj.password, 10),
      });
      const account_object = await new User(obj);
      const saveAccount = await account_object.save();
      if (!saveAccount) {
        return res
          .status(400)
          .json(vm.ApiResponse(false, 400, "Oops! an error occurr"));
      } else {
        saveAccount.password = null;
        return res
          .status(201)
          .json(vm.ApiResponse(true, 200, `account created`, account_object));
      }
    }
  } catch (e) {
    return next(e);
  }
};

//LOGIN
exports.login = async (req, res, next) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    if (!checkEmail) {
      return res
        .status(400)
        .json(vm.ApiResponse(false, 400, "email not found"));
    } else {
      const compareEmail = vm.comparepassword(
        checkEmail.password,
        req.body.password
      );
      if (compareEmail) {
        const signtoken = vm.signToken(checkEmail._id, "Secret");
        checkEmail.password = null;
        return res.status(200).json(
          vm.ApiResponse(true, 200, "login sucessfull", {
            user: checkEmail,
            token: signtoken,
          })
        );
      }
    }
  } catch (e) {
    return next(e);
  }
};
