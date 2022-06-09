import { spawn } from "child_process";
import { stat } from "fs/promises";

const { REPO_URL } = process.env;

function exists() {
    return stat(".git").then(x => x.isDirectory(), () => false);
}

async function shell(cmd) {
    const child = spawn(cmd, {
        shell: true,
        stdio: "inherit",
    });

    const code = await new Promise((resolve, reject) => {
        child.on("error", reject);
        child.on("exit", code => resolve(!code));
    });

    return code;
}

async function boot() {

}

async function wait() {
    return new Promise(() => {});
}

async function update() {

}

async function init() {
    if (!await exists(".git")) {
        await shell(`git init .`);
        await shell(`git remote add origin ${REPO_URL}`);
    }
}

async function sync() {
    if (await shell("git fetch")) {
        if (await shell("git checkout --detach -f origin/sass")) {
            // await shell("git status");
            await shell("ls -lR");
            return true;
        }
    }

    return false;
}

async function loop() {
    await init();
    await sync();
    await boot();

    while (true) {
        if (await sync()) {
           await update();            
        }

        await wait();
    }
}

loop();
