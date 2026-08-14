const http = require("http");
const fs = require("fs");

// Fake Google verification
function verifyGoogleToken(idToken) {
  return { email: "demo@user.com", id: "12345" };
}

// Fake AI assistant
function aiAssistant(prompt) {
  return "AI improved version:\n" + prompt.toUpperCase();
}

http.createServer((req, res) => {
  if (req.url === "/auth/google" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { idToken } = JSON.parse(body);
      const user = verifyGoogleToken(idToken);
      res.end(JSON.stringify({ ok: true, user }));
    });
  }

  if (req.url === "/deploy" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { filename, content } = JSON.parse(body);
      const path = `/var/www/deplit/${filename}`;
      fs.writeFileSync(path, content);
      res.end(JSON.stringify({ deployed: true }));
    });
  }

  if (req.url === "/ai" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const { prompt } = JSON.parse(body);
      const output = aiAssistant(prompt);
      res.end(JSON.stringify({ output }));
    });
  }

}).listen(8080, () => {
  console.log("Deplit backend running on port 8080");
});
