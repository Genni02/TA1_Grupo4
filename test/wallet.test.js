const { Wallet, round2 } = require("../src/wallet");

describe("Wallet - logica de saldo (regresion financiera)", () => {
  test("round2 evita errores clasicos de coma flotante", () => {
    expect(round2(0.1 + 0.2)).toBe(0.3);
  });

  test("deposito y pago mantienen el saldo correcto a 2 decimales", () => {
    const wallet = new Wallet(10.5);
    wallet.deposit(0.3);
    wallet.pay(0.2);
    expect(wallet.balance).toBe(10.6);
  });

  test("no permite pagar mas del saldo disponible", () => {
    const wallet = new Wallet(5);
    expect(() => wallet.pay(10)).toThrow("Saldo insuficiente");
  });

  test("no permite depositos ni pagos negativos o en cero", () => {
    const wallet = new Wallet(5);
    expect(() => wallet.deposit(0)).toThrow();
    expect(() => wallet.pay(-1)).toThrow();
  });
});
