const http = require('http')
const { spawn } = require('child_process');

const options = {
	method: 'POST',
	headers: {
		"content-type": "application/x-www-form-urlencoded"
	}
}

const post = (url, data) => new Promise((resolve) => {
	options.method = 'POST'
	data = new URLSearchParams(data).toString()
	const req = http.request(url, options, (res) => {
		let response = ''
		res.on('data', (chunk) => (response += chunk))
		res.on('end', () => resolve(response))
		res.headers['set-cookie'] && (options.headers['cookie'] = res.headers['set-cookie'].join('; ').split('; ').filter(cookie => cookie.includes("wordpress_")).splice(2, 4).join('; ') + ';')
	})
	req.on('error', console.error)
	req.write(data)
	req.end()
})

const get = (url) => new Promise((resolve) => {
	options.method = 'GET'
	const req = http.request(url, options, (res) => {
		let response = ''
		res.on('data', (chunk) => (response += chunk))
		res.on('end', () => resolve(response))
	})
	req.on('error', console.error)
	req.end()
})

const setup_db = async () => await post(
	'http://localhost/wp-admin/setup-config.php?step=2', {
		dbname: 'wordpress_db',
		uname: 'wordpress_user',
		pwd: 'password',
		dbhost: 'mariadb',
		prefix: 'wp_',
		language: '',
		submit: 'Submit'
	}
)

const setup_admin = async () => await post(
	'http://localhost/wp-admin/install.php?step=2', {
		weblog_title: 'mok',
		user_name: 'strix',
		admin_password: 'tbonmoke123;eqw',
		admin_password2: 'tbonmoke123;eqw',
		admin_email: 'brahimstrix@gmail.com',
		Submit: 'Install WordPress',
		language: ''
	}
)

const login = async () => await post(
	'http://localhost/wp-login.php', {
		log: 'brahimstrix@gmail.com',
		pwd: 'tbonmoke123;eqw',
		"wp-submit": 'Log In',
		redirect_to: 'http://localhost/wp-admin/',
		testcookie: '1'
	}
)

const post_new_user = async (nonce) => await post(
	'http://localhost/wp-admin/user-new.php', {
		action: 'createuser',
		'_wpnonce_create-user': nonce,
		_wp_http_referer: '/wp-admin/user-new.php',
		user_login: 'fqwfqwfwq',
		email: 'fewfqwfq@gmail.com',
		first_name: '',
		last_name: '',
		url: '',
		pass1: 'START8RrbebH#D7&GvHLWPR&VfEND',
		pass2: 'START8RrbebH#D7&GvHLWPR&VfEND',
		send_user_notification: '1',
		role: 'subscriber',
		createuser: 'Add New User',
	}
)

const init = async () => {
	const nginx = spawn('nginx', ['-g', 'daemon off;']);
	nginx.stdout.on('data', console.log)
	nginx.stderr.on('error', console.log)
	await setup_db()
	await setup_admin()
	options.headers['cookie'] = "wordpress_test_cookie=WP%20Cookie%20check; wp_lang=en_US"
	await login()
	let res = await get('http://localhost/wp-admin/user-new.php')
	res = res.slice(res.indexOf('_wpnonce_create-user') + 57)
	// number used once
	const nonce = res.slice(0, res.indexOf('\"'))
	await post_new_user(nonce)
	nginx.kill('SIGTERM')
}

init()
