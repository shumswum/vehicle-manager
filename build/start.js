const args = ['start'];
const ops = { stdio: 'inherit', cwd: 'frontend', shell: true};
require("child_process").spawn("npm", args, opts);