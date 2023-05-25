class PaymentStrategy {
  pay(amount) {}
}

class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using Credit Card`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class ShoppingCart {
  constructor(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
    this.amount = 0;
  }

  setPaymentStrategy(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  addAmount(amount) {
    this.amount += amount;
  }

  checkout() {
    this.paymentStrategy.pay(this.amount);
    this.amount = 0;
  }
}

const cart = new ShoppingCart(new CreditCardStrategy());
cart.addAmount(100);
cart.checkout();

cart.setPaymentStrategy(new PayPalStrategy());
cart.addAmount(200);
cart.checkout();
