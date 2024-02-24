import { Request, Response } from "express";
import ErrorMessage from "../data/classes/errorMessage";
import { throwErrorHandler } from "../data/classes/errorHandler";
import logger from "../data/logger";
import { users } from "../data/users";

export const validatePin = (req: Request, res: Response) => {
  const { pin } = req.body;

  try {
    if (!pin) {
      throw new ErrorMessage(
        "REQUIRES_PIN",
        "You must provide a PIN to continue.",
        400
      );
    }

    const validUser = users.find((user) => user.pin === pin);

    if (!validUser) {
      throw new ErrorMessage(
        "INVALID_PIN",
        "You must provide a valid PIN to continue.",
        400
      );
    }
    res.status(200).send({
      user: {
        id: validUser.id,
        fullname: validUser.fullName,
        balance: validUser.balance,
        creditCard: validUser.creditCard,
      },
    });
  } catch (error) {
    return throwErrorHandler(error, res, () => {
      logger.error(`Validate Pin Interal Error: ${error}`);
    });
  }
};

export const widthdraw = (req: Request, res: Response) => {
  const { id, amount } = req.body;

  try {
    if (!id && !amount) {
      throw new ErrorMessage(
        "WITHDRAW_REQUIRES_DATA",
        "You must provide the user ID and amount.",
        400
      );
    }

    if (!id) {
      throw new ErrorMessage(
        "WITHDRAW_REQUIRES_ID",
        "You must provide the user ID.",
        400
      );
    }

    if (!amount) {
      throw new ErrorMessage(
        "WITHDRAW_REQUIRES_AMOUNT",
        "You must provide the amount of withdrawal.",
        400
      );
    }

    const validUser = users.find((user) => user.id === id);

    if (validUser) {
      if (amount > validUser?.balance) {
        throw new ErrorMessage(
          "WITHDRAW_INSUFFICIENT_BALANCE",
          "Insuficient balance",
          400
        );
      }

      validUser.balance = validUser?.balance - amount;

      res.status(200).send({
        msg: "sucessfull withdrawal",
        balance: validUser.balance,
      });
    } else {
      throw new ErrorMessage("WITHDRAW_INVALID_USER", "Invalid User", 400);
    }
  } catch (error) {
    return throwErrorHandler(error, res, () => {
      logger.error(`Withdraw Interal Server Error: ${error}`);
    });
  }
};

export const deposit = (req: Request, res: Response) => {
  const { id, amount } = req.body;

  try {
    if (!id && !amount) {
      throw new ErrorMessage(
        "DEPOSIT_REQUIRES_DATA",
        "You must provide the user ID and amount.",
        400
      );
    }

    if (!id) {
      throw new ErrorMessage(
        "DEPOSIT_REQUIRES_ID",
        "You must provide the user ID.",
        400
      );
    }

    if (!amount) {
      throw new ErrorMessage(
        "DEPOSIT_REQUIRES_AMOUNT",
        "You must provide the amount of deposit.",
        400
      );
    }

    const validUser = users.find((user) => user.id === id);

    if (validUser) {
      if (Math.sign(amount) !== 1) {
        throw new ErrorMessage("DEPOSIT_INVALID_AMOUNT", "Invalid amount", 400);
      }

      validUser.balance = validUser?.balance + amount;

      res.status(200).send({
        msg: "sucessfull deposit",
        balance: validUser.balance,
      });
    } else {
      throw new ErrorMessage("DEPOSIT_INVALID_USER", "Invalid User", 400);
    }
  } catch (error) {
    return throwErrorHandler(error, res, () => {
      logger.error(`Deposit Interal Server Error: ${error}`);
    });
  }
};

export const updatePIN = (req: Request, res: Response) => {
  const { id, newPin } = req.body;

  try {
    if (!id && !newPin) {
      throw new ErrorMessage(
        "RE_ENTER_REQUIRES_DATA",
        "You must provide the user ID and the new PIN.",
        400
      );
    }

    if (!id) {
      throw new ErrorMessage(
        "RE_ENTER_REQUIRES_ID",
        "You must provide the user ID.",
        400
      );
    }

    if (!newPin) {
      throw new ErrorMessage(
        "RE_ENTER_REQUIRES_PIN",
        "You must provide the new pin.",
        400
      );
    }

    const validUser = users.find((user) => user.id === id);

    if (validUser) {
      validUser.pin = newPin;

      res.status(200).send({
        msg: "Pin changed sucessfully",
      });
    } else {
      throw new ErrorMessage("RE_ENTER_INVALID_PIN", "Invalid Pin", 400);
    }
  } catch (error) {
    return throwErrorHandler(error, res, () => {
      logger.error(`Re_enter Interal Server Error: ${error}`);
    });
  }
};
