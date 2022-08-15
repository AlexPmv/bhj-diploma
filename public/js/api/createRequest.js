/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    if (options.url === '/user/login') {
        const formData = new FormData();
        formData.append('email', options.data.email);
        formData.append('password', options.data.password);
        xhr.open(options.method, options.url)
        xhr.send(formData);

    } else if (options.url === '/user/register') {
        const formData = new FormData();
        formData.append('name', options.data.name);
        formData.append('email', options.data.email);
        formData.append('password', options.data.password);

        xhr.open(options.method, options.url)
        xhr.send(formData);

    } else if (options.url === '/user/current' || options.url === '/user/logout') {
        xhr.open(options.method, options.url)
        xhr.send();
        
    } else if ((options.url === '/account') && options.method === 'GET') {
        xhr.open(options.method, `${options.url}`)
        xhr.send();
        
    } else if (options.url === '/account' && options.method === 'PUT') {
        const formData = new FormData();
        formData.append('name', options.data.name);
        xhr.open(options.method, options.url);
        xhr.send(formData);
        
    } else if (options.url === '/account' && options.method === 'DELETE') {
        const formData = new FormData();
        formData.append('id', options.data);
        xhr.open(options.method, options.url);
        xhr.send(formData);
        
    } else if ((options.url === '/transaction') && options.method === 'GET') {
        xhr.open(options.method, `${options.url}?account_id=${options.data.account_id}`)
        xhr.send();
        
    } else if ((options.url === '/transaction') && options.method === 'PUT') {
        const formData = new FormData();
        formData.append('type', options.data.type);
        formData.append('name', options.data.name);
        formData.append('sum', options.data.sum);
        formData.append('account_id', options.data.account_id);
        xhr.open(options.method, options.url)
        xhr.send(formData);

    }else if ((options.url === '/transaction') && options.method === 'DELETE') {
        const formData = new FormData();
        formData.append('id', options.data);
        xhr.open(options.method, options.url)
        xhr.send(formData);
    }

    xhr.onload = () => {
        if (xhr.status === 200) {
            options.callback(null, xhr.response);
        } else {
            options.callback(xhr.response);
        };
    };

};
