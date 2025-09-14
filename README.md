### Table of Content

**API request**
[What is an API call](#what-is-an-api-call)


**Async Await**
[What is Async Await)](#what-is-async-await)<br>
[Async Await - APIs request (GET)](#async-await---apis-request-get)<br>
[Async Await - APIs request (POST, PUT, DELETE)](#async-await---apis-request-post-put-delete)<br>

---

### What is an API call?

An API request or API call, is a message sent by a **client** to a **server**
  - in general, your client is your frontend - it's main responsibility is to display things to users
  - your server are generally your backend and you can think of it like your database - it's main responsibility is to store data

There are four main HTTP Method and they are usually refers to as `CRUD` operation. (Create, Read, Update, Delete)
  - `GET` - Read data from database
  - `POST` - Create or write to database
  - `PUT` - Update data in the database
  - `DELETE` - Delete data in the database

You can create most basic web application with these 4 methods. Think of a blog website
  - you can make API calls to fetch your post from the database
  - you can make API calls to make a new post and write it to the database
  - you can make API calls to update your post and save the changes in the database
  - you can make API cas to delete your post permanently from the database

![API call](/image/API_call.jpg)

---

### Async Await

### What is Async Await

The computer executes code line by line, this is fine until your code execution depends on some external resources to execute and return some information back to our computer
  - one major use case is sending APIs/CRUD requests - you are relying on the server to complete the operation!

The `async` keyword specify that a function is asynchronous, which means that some part of this function will depends on external resources to execute

The `await` keyword specify the specific line of code that our computer needs to wait for before proceeding to the next steps

--- 

Take a look at this APIs: [Advice Slip JSON API](https://api.adviceslip.com/)

![Advice Slip JSON API - GET Request](/image/advice_slip_JSON_API_get_request_doc.jpg)
  - The `HTTP Method` is `GET` - which means that the purpose of this API endpoint is to **grab** or **get** data from a source
  - The `API endpoint/URL` is `https://api.adviceslip.com/advice` - think of API as a phone number, you have to call this number to do something - in this case, because this is a `GET` method, we are **grabbing** data from this URL
  - The description tells you that it returns a `slip object`

![Slip Object](/image/slip_object.jpg)
  - in all APIs documentation, there should always be a section that specify how the return object should look like
  - in this case, the `slip object` will be a JSON object that has two properties/keys - `slip_id` and `advice`

Now let's try to hit the endpoints, if the `HTTP Method` is `GET`, we can also hit the endpoints simply by copying the URL and pasting it in our browser.

You should see something similar to this:

![Example Return Object](/image/example_return_object.jpg)

---

### Async Await - APIs request (GET)

[Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

```
async function getRandomAdviceSlip() {
  const url = "https://api.adviceslip.com/advice"

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("response is not okay, check if url is correct")
    }

    const jsObject = await response.json()
    console.log(jsObject)

    // at this point, you can do what you want to the JSON
    // it usually means some form of DOM manipulation to display the data that you got

  } catch (error) {
    console.log("An error has occurred", error.message)
  }
}

```

**try/catch and throw**
  - the `try`-`catch` block is basically telling your program that **"this might break or have error, so just `try` the code, but if it fails, don't freak out, we can `catch` the error and execute something else instead"**
  - `throw` is used to manually exit the `try` block and move on to the `catch` block

In the example above:
  - we wrap the request in the `try` block because it depends on an external resources - the APIs
    - even if your code is 100% correct, it can still fail if for example - you don't have internet connection. Your code can be correctly but because of the internet, we couldn't interact with the external resources
  - the `catch` block is a fallback plan, it defines what happen when the `try` block fail
  - the `throw` is to manually exit the `try` block - for example the fetch request did work, but something is wrong with the response 

To test this:
  1. copy the code above and run the function. You should get back a json object
  2. turn off your internet and run the function. You should get "An error has occurred fetch failed"
  3. turn back on the internet and change the url to something invalid. You should get "An error has occurred response is not okay, check if url is correct"

---

### Async Await - APIs request (POST, PUT, DELETE)

[Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

This is almost the exact same the above in syntax, except that the default behavior of `fetch` is `GET`, so it doesn't need an `option`

The option would look like this:

```
  const option =  {
    method: "POST" / "PUT" / "Delete",
    headers: {
      "Content-Type": "application/json" // almost always this
    },
  }
```

```
async function functionName() {
  const url = "some URL"

  data = {
    name: "Jessie",
    blog_content: "Had a wonderful day today",
    post_date: "9/13/2025"
  }

  const option =  {
    method: "POST"
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }

  try {
    const response = await fetch(url, option)

    if (!response.ok) {
      throw new Error("response is not okay, check if url is correct")
    }

    const jsObject = await response.json()
    console.log(jsObject)

    // at this point, you can do what you want to the JSON
    // it usually means some form of DOM manipulation to display the data that you got

  } catch (error) {
    console.log("An error has occurred", error.message)
  }
}

```