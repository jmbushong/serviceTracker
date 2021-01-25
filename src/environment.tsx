let API_URL:any;
switch (window.location.hostname){
    case 'localhost':
    case '127.0.0.1':
        API_URL= 'http://localhost:4000'
        break
    default: 
        API_URL= 'https://jmb-service-tracker-server.herokuapp.com'
}

export default API_URL;