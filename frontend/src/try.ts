import axios, {AxiosError, AxiosResponse} from 'axios';

const timeout = 10000



const logSuccessfulResponse = (response : AxiosResponse) => {
  console.log('Inside log success function')
  const { status, statusText } = response
  const { method, url } = response.config
  console.log(`[${method?.toUpperCase()}]${url}`, {
    status,
    statusText,
  })
  return response
}

const logFailedResponse = (error: AxiosError) => {
  console.log('Inside log failed function')
  const { status, statusText, headers } = error?.response
  const { method, url } = error.config
  console.log(`[${method.toUpperCase()}]${url}`, {
    status,
    statusText,
    body: error?.response?.data,
  })
  throw new Error( JSON.stringify(error?.response?.data))
  // return error?.response
}

 async function post(
  url,
  requestHeaders,
) {
  const payload = {
    // input1: 'one input',
    input2: 'two input'
  }
  const config = {
    method: 'post',
    url,
    headers: requestHeaders,
    timeout,
    data: payload,
  }
  console.log("making post call with payload", payload)

  const res = axios(config).then(logSuccessfulResponse, logFailedResponse)
  return res
}
async function saveCredential() {
    try {
      const url = `http://localhost:3000/post-call`
      const headers = {
        'Content-Type': 'application/json',
      }
      const issuerServiceResponse = await post(url, headers)
      console.log('logging in try block inside save credential')
      return issuerServiceResponse.data
    } catch (error) {
      console.log(error.message)
      throw new Error(`failed storing credential in issuer-service: ${JSON.stringify(error.message)}`)
    }
  }
  

var newfunc = async function() {
  try {
    const final = await saveCredential()
    console.log("logging in try block in main function", final)
    
  } catch (error) {
    console.log("logging in catch block in main function", error.message)
  }

}();