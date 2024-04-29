function response(status, data) {

    if(status === 'error') {
        return {
            status: status,
            message: data,
        };
    } else {
        return {
            status: status,
            data: data,
        };
    }
    
}

module.exports = response;