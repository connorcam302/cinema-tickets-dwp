import { expect } from "chai";
import InvalidPurchaseException from "../../../src/pairtest/lib/InvalidPurchaseException.js";

describe("InvalidPurchaseException", () => {
  it("should create an instance of InvalidPurchaseException with the correct message and name", () => {
    const message = "This is a test message.";
    const exception = new InvalidPurchaseException(message);

    expect(exception).to.be.an.instanceof(InvalidPurchaseException);
    expect(exception).to.be.an.instanceof(Error);
    expect(exception.message).to.equal(message);
    expect(exception.name).to.equal("InvalidPurchaseException");
  });
});
