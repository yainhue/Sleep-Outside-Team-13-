const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  // first convert response to json
  var responseJson = res.json();

  // if the response is OK
  if (res.ok) {
    // return the response json
    return responseJson;
  } else {
    // if the response is not OK, throw an error with the response json as the message
    throw { name: 'servicesError', message: responseJson };;
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);

    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }

}