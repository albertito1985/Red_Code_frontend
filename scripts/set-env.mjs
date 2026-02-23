import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const defaultHost = 'redcodebackend-production.up.railway.app';
const rawHost = process.env.NG_BACKEND_HOST ?? process.env.BACKEND_HOST ?? defaultHost;
const rawPort = process.env.NG_BACKEND_PORT ?? process.env.BACKEND_PORT ?? '0';

const backendHost = String(rawHost).trim() || defaultHost;
const parsedPort = Number.parseInt(String(rawPort), 10);
const backendPort = Number.isFinite(parsedPort) ? parsedPort : 0;
const escapedHost = backendHost.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const fileContent = `export const environment = {
  production: true,
  backend: {
    host: '${escapedHost}',
    port: ${backendPort}
  }
};
`;

const outputPath = resolve('src/environments/environment.production.ts');
writeFileSync(outputPath, fileContent, 'utf8');

console.log(`Generated ${outputPath} using NG_BACKEND_HOST=${backendHost} and NG_BACKEND_PORT=${backendPort}`);
