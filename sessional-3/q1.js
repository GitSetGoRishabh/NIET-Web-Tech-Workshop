const validateInput = (email, password, mobile, callback) => {
    let errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = `Invalid email.`;
    if (password.length < 6) errors.password = `Password too short.`;
    if (!/^[0-9]{10}$/.test(mobile)) errors.mobile = `Invalid mobile.`;
    callback(Object.keys(errors).length === 0, errors);
};

const sendData = (data) => {
    return new Promise((resolve, reject) => {
        fetch('process.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data)
        })
        .then(res => res.text())
        .then(text => text.includes("Success") ? resolve(text) : reject(text))
        .catch(err => reject(err));
    });
};

document.getElementById('regForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mobile = document.getElementById('mobile').value;

    ['emailMsg', 'passMsg', 'mobileMsg'].forEach(id => document.getElementById(id).innerText = '');
    document.getElementById('statusMsg').innerText = 'Validating...';

    validateInput(email, password, mobile, (isValid, errors) => {
        if (!isValid) {
            if (errors.email) document.getElementById('emailMsg').innerHTML = errors.email;
            if (errors.password) document.getElementById('passMsg').innerHTML = errors.password;
            if (errors.mobile) document.getElementById('mobileMsg').innerHTML = errors.mobile;
            document.getElementById('statusMsg').innerText = 'Fix errors.';
        } else {
            document.getElementById('statusMsg').innerText = 'Sending...';
            sendData({ email, password, mobile })
                .then(msg => document.getElementById('statusMsg').innerHTML = `<span class="success">${msg}</span>`)
                .catch(msg => document.getElementById('statusMsg').innerHTML = `<span class="error">${msg}</span>`);
        }
    });
});