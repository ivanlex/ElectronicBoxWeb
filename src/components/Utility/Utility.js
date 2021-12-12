export default function addToFormBody(formData){
    let formBody = [];

    for (let property in formData) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(formData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return formBody;
}