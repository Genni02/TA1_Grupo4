// Logica de negocio de la billetera, separada del servidor HTTP para
// que sea facil de cubrir con pruebas de regresion (parte del pipeline).

function round2(amount) {
  // Redondeo correcto a 2 decimales, evitando el error de redondeo
  // (0.1 + 0.2 style) que en produccion afecto el saldo de 200 usuarios.
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

class Wallet {
  constructor(initialBalance = 0) {
    this.balance = round2(initialBalance);
    this.history = [];
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("El monto a depositar debe ser positivo");
    this.balance = round2(this.balance + amount);
    this.history.push({ type: "deposit", amount: round2(amount) });
    return this.balance;
  }

  pay(amount) {
    if (amount <= 0) throw new Error("El monto a pagar debe ser positivo");
    if (amount > this.balance) throw new Error("Saldo insuficiente");
    this.balance = round2(this.balance - amount);
    this.history.push({ type: "payment", amount: round2(amount) });
    return this.balance;
  }
}

module.exports = { Wallet, round2 };
