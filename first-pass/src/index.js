import createExpressApp from './app/express/index.js';
import createConfig from './config.js';
import env from './env.js';

function start(){
	app.listen(env.port, signalAppStart);
}

function signalAppStart() {
	console.log(`${env.appName} started`)
	console.table([['Port', env.port], ['Environment', env.env]]);
}
const config = createConfig({env})
const app = createExpressApp({ config, env })
export default {
	app,
	config,
	start
}

