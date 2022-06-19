export function checkUrl(val){

    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if (regex.test(val)) {//Passou, é uma URL
        return true;
    } else {
        return false;
    }
}

export function checkEmpty(val){

    if ( val ) {//Passou, não está vazio
        return true;
    } else {
        return false;
    }
}
