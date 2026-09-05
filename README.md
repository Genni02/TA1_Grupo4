# PagaYa — Backend base (Caso 4, Grupo 4)

Base de software mínima para el Caso 4 del Anexo TA1. El código y las pruebas de regresión sobre el cálculo de saldo (incluido el caso de redondeo que en el enunciado causó el incidente con 200 usuarios) ya están implementados y pasan. **El grupo no necesita programar la billetera**: su entregable es el pipeline CI/CD.

## Qué incluye

- `src/wallet.js`: lógica de depósito/pago con redondeo correcto a 2 decimales.
- `src/app.js`: API REST mínima (`/wallet/:userId/deposit`, `/wallet/:userId/pay`, `/wallet/:userId`).
- `test/wallet.test.js`: pruebas de regresión, incluyendo el caso de redondeo y validaciones de saldo insuficiente.

## Cómo correrlo localmente

```bash
npm install
npm test
npm start
```

## Qué debe hacer el grupo

Diseñar el pipeline (compilación, pruebas automatizadas de regresión, análisis de seguridad básico, despliegue controlado/canario con registro de auditoría) según la guía del Caso 4 del Anexo TA1, y documentarlo con diagrama y justificación técnica. No se requiere agregar funcionalidad nueva a la aplicación.
