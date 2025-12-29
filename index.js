const express = require("express");
const path = require("path");
const os = require("os");
const puppeteer = require("puppeteer");
const execFile = require("child_process").execFile;
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const KINDLE_WIDTH = Number.parseInt(process.env.KINDLE_WIDTH || "600", 10);
const KINDLE_HEIGHT = Number.parseInt(process.env.KINDLE_HEIGHT || "800", 10);

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", async (req, res) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "web-to-kindle-"));
    const rawPath = path.join(tmpDir, "raw.png");
    const outPath = path.join(tmpDir, "out.png");

    let browser;
    try {
      browser = await puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
      });

      const page = await browser.newPage();
      await page.setViewport({ width: KINDLE_WIDTH, height: KINDLE_HEIGHT });
      await page.goto(
        process.env.SCREENSHOT_URL ||
          "https://darksky.net/details/40.7127,-74.0059/2021-1-6/us12/en",
        { waitUntil: "networkidle2" }
      );
      await page.screenshot({ path: rawPath, type: "png" });

      await convert(rawPath, outPath);
      const screenshot = fs.readFileSync(outPath);

      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": screenshot.length,
        "Cache-Control": "no-store",
      });
      return res.end(screenshot);
    } catch (error) {
      console.error({ error });
      res
        .status(500)
        .type("text/plain")
        .send(String(error?.message || error));
      return;
    } finally {
      try {
        if (browser) await browser.close();
      } catch {
        // ignore
      }
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {
        // ignore
      }
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function convert(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const args = [
      inputPath,
      "-gravity",
      "center",
      "-extent",
      `${KINDLE_WIDTH}x${KINDLE_HEIGHT}`,
      "-colorspace",
      "gray",
      "-depth",
      "8",
      outputPath,
    ];
    execFile("convert", args, (error, stdout, stderr) => {
      if (error) {
        console.error({ error, stdout, stderr });
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
