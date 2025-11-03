import fs from "fs";
import path from "path";
import { STORAGE_STATE_TOKEN } from "playwright.config";
import { log } from "./logger";

const TOKEN_PATH = STORAGE_STATE_TOKEN;

export async function getValidToken(): Promise<string> {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error(
      `Token file not found at ${TOKEN_PATH}. Did global setup run?`
    );
  }

  const tokenData = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  const { accessToken } = tokenData;

  return accessToken;
}

export function saveToken(accessToken: string) {
  const tokenData = {
    accessToken,
  };

  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData));
  log.info("✅ Access token saved.");
}
