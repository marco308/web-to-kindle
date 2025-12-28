# Web to Kindle

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

A lightweight web service that converts web pages into Kindle-ready grayscale images. Perfect for capturing weather forecasts, news articles, or any web content optimized for e-reader displays.

## Features

- Captures full webpage screenshots using headless Chrome (Puppeteer)
- Optimized for Kindle dimensions (600x800 pixels)
- Converts images to grayscale for e-reader compatibility
- Handles dynamic/JavaScript-rendered content
- One-click Heroku deployment

## How It Works

1. The service navigates to the configured URL using a headless Chrome browser
2. Captures a screenshot at Kindle-optimized dimensions
3. Processes the image through ImageMagick to convert to grayscale
4. Returns the processed PNG image

## Prerequisites

- Node.js v12.x or higher
- ImageMagick (for the `convert` command)
- npm

## Installation

### Docker (Recommended)

The easiest way to run Web to Kindle is with Docker Compose:

```bash
# Clone the repository
git clone https://github.com/lankybutmacho/web-to-kindle.git
cd web-to-kindle

# Set your target URL and start the container
SCREENSHOT_URL="https://example.com" docker compose up -d
```

Or create a `.env` file:

```bash
SCREENSHOT_URL=https://example.com
```

Then run:

```bash
docker compose up -d
```

The service will be available at `http://localhost:3000`.

To rebuild after changes:

```bash
docker compose up -d --build
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/lankybutmacho/web-to-kindle.git
cd web-to-kindle

# Install dependencies
npm install

# Set the URL to capture
export SCREENSHOT_URL="https://example.com"

# Start the server
npm start
```

The server will start on `http://localhost:3000`. Visit this URL to get your Kindle-ready screenshot.

### Heroku Deployment

Click the "Deploy to Heroku" button above, or deploy manually:

```bash
heroku create your-app-name
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack
heroku config:set SCREENSHOT_URL="https://your-target-url.com"
git push heroku main
```

## Configuration

| Variable         | Description                       | Default               |
| ---------------- | --------------------------------- | --------------------- |
| `SCREENSHOT_URL` | The URL of the webpage to capture | Dark Sky weather page |
| `KINDLE_WIDTH`   | Output image width in pixels      | `600`                 |
| `KINDLE_HEIGHT`  | Output image height in pixels     | `800`                 |
| `PORT`           | Server port                       | `3000`                |

## Usage

Once running, simply make a GET request to the root endpoint:

```bash
curl http://localhost:3000 --output screenshot.png
```

Or open `http://localhost:3000` in your browser to download the image directly.

## Technical Details

- **Viewport**: `KINDLE_WIDTH` x `KINDLE_HEIGHT` (defaults to 600x800)
- **Color Space**: 8-bit grayscale
- **Output Format**: PNG
- **Browser Engine**: Chromium via Puppeteer

### Picking the Right Size

`eips -g` does not scale images, it draws them at 1:1 pixels. If your Kindle has a higher-resolution screen (e.g., Paperwhite 3 is 1072x1448), set:

`KINDLE_WIDTH=1072 KINDLE_HEIGHT=1448`

## Project Structure

```
├── index.js           # Main application logic
├── package.json       # Dependencies and scripts
├── Dockerfile         # Docker image configuration
├── docker-compose.yml # Docker Compose configuration
├── app.json           # Heroku deployment configuration
├── Procfile           # Heroku process definition
└── README.md
```

## License

MIT
