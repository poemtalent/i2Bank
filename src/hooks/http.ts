import axios from 'axios';

export default async function (url: string, body: any = null) {
    let result: any = null;
    const token = localStorage.getItem('token');
    const headers = {
        headers: {
            'token': token,
        }
    };
    //console.log(localStorage.getItem('token'),'token********')
    await axios.post(url, body, headers).then((resolve) => {
        result = resolve;
    }).catch((err) => {
        console.log('错误', err)
    })
    return result;
}
