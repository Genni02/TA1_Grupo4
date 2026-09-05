const fs = require("fs");
const path = require("path");

function logDeploymentAudit() {
  const env = process.env.DEPLOY_ENV || process.env.NODE_ENV || "staging";
  const version = process.env.GITHUB_SHA || process.env.CI_COMMIT_SHA || process.env.BUILD_NUMBER || "dev-" + Date.now();
  const deployer = process.env.GITHUB_ACTOR || process.env.GITLAB_USER_NAME || process.env.BUILD_USER || "CI/CD Pipeline";
  const status = process.env.DEPLOY_STATUS || "SUCCESS";
  const rolloutPercentage = process.env.ROLLOUT_PERCENTAGE || "100%";
  const timestamp = new Date().toISOString();

  const auditEntry = {
    app: "pagaya-backend",
    timestamp,
    environment: env,
    rolloutPercentage,
    commitHash: version,
    deployedBy: deployer,
    status
  };

  console.log("=========================================");
  console.log("📜 REGISTRO DE AUDITORÍA DE DESPLIEGUE PAGAYA");
  console.log("=========================================");
  console.log(JSON.stringify(auditEntry, null, 2));
  console.log("=========================================");

  const logDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFilePath = path.join(logDir, "deployments_audit.log");
  fs.appendFileSync(logFilePath, JSON.stringify(auditEntry) + "\n");
  console.log(`✅ Evento guardado en registro de auditoría: ${logFilePath}`);
}

logDeploymentAudit();
