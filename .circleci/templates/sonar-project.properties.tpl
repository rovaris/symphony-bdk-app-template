sonar.host.url=https://sonarqube-dev.symphonymarket.solutions
sonar.projectKey=sms-dev-fe-template-app
soanr.projectName=Generic Template for Applications
sonar.projectVersion=1.0.0
sonar.scm.provider=git
sonar.sources=./
sonar.tests=./extension-app/
sonar.test.inclusions=**/__tests__/*.js
sonar.test.exclusions=./symphony-wrapper/renderer.js
sonar.exclusions=./symphony-wrapper/renderer.js
sonar.javascript.lcov.reportPaths=./coverage/lcov.info
sonar.login=${ANALYSIS_TOKEN}
sonar.links.ci=https://circleci.com/gh/SymphonyPlatformSolutions/symphony-ext-app-template
sonar.links.scm=https://github.com/SymphonyPlatformSolutions/symphony-ext-app-template.git
sonar.testExecutionReportPaths=test-report.xml
