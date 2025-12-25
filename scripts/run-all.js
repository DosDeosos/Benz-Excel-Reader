import { spawn } from "child_process";
import { platform } from "os";

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Running: ${command} ${args.join(" ")}\n`);

    const child = spawn(command, args, {
      stdio: "inherit",
      shell: true,
    });

    child.on("error", (error) => {
      console.error(`\n❌ Error executing ${command}:`, error.message);
      reject(error);
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        console.error(
          `\n❌ Command failed with exit code ${code}: ${command} ${args.join(" ")}`
        );
        reject(new Error(`Process exited with code ${code}`));
      } else {
        console.log(
          `\n✅ Successfully completed: ${command} ${args.join(" ")}`
        );
        resolve();
      }
    });
  });
}

function openBrowser(url) {
  const os = platform();
  let command;

  switch (os) {
    case "darwin":
      command = "open";
      break;
    case "win32":
      command = "start";
      break;
    default:
      command = "xdg-open";
  }

  console.log(`\n🌐 Opening browser at ${url}...\n`);

  spawn(command, [url], {
    shell: true,
    detached: true,
    stdio: "ignore",
  }).unref();
}

async function main() {
  try {
    console.log("═══════════════════════════════════════════════════");
    console.log("   Starting Full Build and Deploy Process");
    console.log("═══════════════════════════════════════════════════");

    await runCommand("node", ["scripts/extract-excel.js"]);

    await runCommand("npm", ["run", "build"]);

    console.log("\n🎉 Build completed successfully! Starting server...\n");

    setTimeout(() => {
      openBrowser("http://localhost:3000");
    }, 2000);

    await runCommand("npm", ["run", "start"]);
  } catch (error) {
    console.error("\n═══════════════════════════════════════════════════");
    console.error("   ❌ BUILD PROCESS FAILED");
    console.error("═══════════════════════════════════════════════════");
    console.error("Error:", error.message);
    console.error("\n🛑 Killing entire script...\n");
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  console.log("\n\n⚠️  Process interrupted by user. Exiting...\n");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n\n⚠️  Process terminated. Exiting...\n");
  process.exit(0);
});

main();
