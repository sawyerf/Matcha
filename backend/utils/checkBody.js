const whatType = (type) => {
    if (['email', 'password', 'date', 'sexuality', 'gender', 'tags', 'uid'].indexOf(type) >= 0) {
        return 'string';
    }
    return type;
}
const testEmail = (email) => {
    const regex = /[A-Za-z0-9]*@[A-Za-z0-9]{2,}.[A-Za-z0-9]{1,}/;
    return regex.test(email);
}

const testPassword = (password) => {
    const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    return regex.test(password);
}

const testDate = (date) => {
    const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/;
    return regex.test(date);
}

const testSexuality = (sexuality) => {
    const regex = /[HF]{1,2}/;
    return regex.test(sexuality);
}

const testGender = (gender) => {
    const regex = /[HF]/;
    return regex.test(gender);
}

const testTags = (tags) => {
    const regex = /\#[a-z]*([a-z]*)*/;
    return regex.test(tags);
}

const testUid = (tags) => {
    const regex = /[a-f0-9\-]*/;
    return regex.test(tags);
}

export const checkBody = (check, body) => {
    console.log('req: ', body)
    let type;
    for (let key in check) {
        if (!(key in body)) return false;
        type = whatType(check[key]);
        // console.log(key, ' : ', typeof body[key])
        if (type != typeof body[key]) {
            console.log(key, ' : Bad type');
            return false;
        }
        if (check[key] == 'email') {
            if (testEmail(body[key]) == false) return false;
        } else if (check[key] == 'password') {
            if (testPassword(body[key]) == false) return false;
        } else if (check[key] == 'date') {
            if (testDate(body[key]) == false) return false;
        } else if (check[key] == 'sexuality') {
            if (testSexuality(body[key]) == false) return false;
        } else if (check[key] == 'gender') {
            if (testGender(body[key]) == false) return false;
        } else if (check[key] == 'tags') {
            if (testTags(body[key]) == false) return false;
        } else if (check[key] == 'uid') {
            if (testUid(body[key]) == false) return false;
        } else if (check[key] == 'string') {
            if (body[key] == '') return false;
        }
    }
    return true;
}