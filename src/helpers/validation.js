import React from "react";
import { Component } from "react-native";

export default class Validate {
  static isEmailValid(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) == 0;
  }

  static isPasswordValid(password) {
    //let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // /let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let reg = /^([a-zA-Z0-9-@$!%*?#]){6,}$/;
    return reg.test(password) == 0;
    // return password && password.length >= 6;
  }

  static isPhoneValid(phone) {
    let reg = /^[+]{1}[0-9]{12}$/g;
    return reg.test(phone) == 0;
  }
}
