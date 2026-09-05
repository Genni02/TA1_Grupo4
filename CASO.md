# Repositorio base de software: caso4_PagaYa

**API REST en Node.js/Express con Jest**, incluye la lógica de saldo con pruebas de regresión sobre el caso de redondeo.

- **Tipo de software:** Billetera digital para transferencias, pago de servicios y recarga de celulares, con backend transaccional y apps web y móvil.
- **Equipo de desarrollo:**
  - 1 desarrollador backend (transacciones)
  - 1 desarrollador frontend/mobile
  - 1 ingeniero de seguridad
  - 1 QA de automatización de pruebas
  - 1 encargado de DevOps / SRE
- **Problema de despliegue:** Las pruebas de regresión se hacen manualmente y toman 2 días completos antes de cada release, por lo que el negocio solo logra publicar una vez al mes en lugar de las dos veces al mes que necesita. Además, hace tres meses se desplegó una versión sin todas las pruebas completas y un error de redondeo afectó el saldo mostrado a 200 usuarios durante varias horas.
- **Necesidades de despliegue:** Por tratarse de una aplicación financiera, cada cambio debe pasar por pruebas automatizadas rigurosas antes de producción, mantener registro de auditoría de cada despliegue, y permitir liberar cambios de forma gradual (a un porcentaje de usuarios) para reducir el riesgo de incidentes como el ya ocurrido.

---

## Guía para el diseño del flujo CI/CD

- **Etapas mínimas:** compilación, pruebas automatizadas (unitarias y de regresión sobre cálculo de saldos/transacciones), análisis de seguridad básico, despliegue controlado (por ejemplo canario o gradual) con registro/auditoría del despliegue.
- **Herramienta sugerida:** Jenkins o GitLab CI, valorando el soporte para aprobaciones manuales antes de producción y trazabilidad de cada ejecución del pipeline.
- **Justificación técnica esperada:** cómo el pipeline habilita releases quincenales en vez de mensuales, cómo se previene un error como el de los 200 usuarios afectados, y cómo el despliegue gradual limita el impacto de un posible fallo futuro.