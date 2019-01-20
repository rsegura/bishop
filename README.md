# Bishop (code challenge)

Our objetive is create an api that joins different sources of data.

`Clash`: http://www.clashapi.xyz/api/cards/{id} // json
- images: /images/cards/{id|idName}.png

`Pokemon`: https://pokeapi.co/api/v2/pokemon/{id} // json

`Drivers`: http://ergast.com/api/f1/drivers/{id} // xml
- url: Driver:url

## Prologue

In this exercise, app is based on: Express. If you are not familiar with it you 
can check the documentation in the following link:

- Express https://expressjs.com/en/4x/api.html

Around these libraries, we've created a few components and basic structure for
the project. Here we have some highlights of the structure of the project.

- `/controllers` As any other express application you can find under this folder
  basic routers for different entities.
  
## Run

First at all, clone the repo using the button at the top. Or if you prefer, you
can fork the project.

<img width="318" alt="screen shot 2019-01-09 at 5 49 43 pm" src="https://user-images.githubusercontent.com/1523379/50914522-028c0b80-1437-11e9-82fc-5689f5f11039.png">

Then, you need to install all the packages `npm install`. If you want to
start, you can run the application with `npm start`.



## Exercise

Create an endpoint called `items`. This endpoint shall group all the information 
previously mentioned. The goal is normalize the output of those APIs. In order 
to do that, we are going to reduce the information provided to:

- `id` unique id which is going to be used for more information
- `name` display name

Then our endpoint `/items/` is going to return a JSON with the next structure: 

```
[
    {
        "id": "some-id",
        "name": "whatever",
    },
    ...
]
```

### Next steps

Aditionally, our clients want to retrieve a little more information from this 
items. To achieve that goal, we are going to create and endpoint for that 
purpose.

`/items/:id`

In this case, we want to reply with the following structure:
```
{
    "id": "some-id",
    "image": "://url/to/image",
    "name": "whatever",
}

```

As our `drivers` API doesn't have any images, we are going to display in 
`image` field the url for their wikipedia sites.

## Tips
- You can check API response structure in the root url provided or:
    - http://www.clashapi.xyz/api/cards/5a583d95dbcce5001447ab33
    - https://pokeapi.co/api/v2/pokemon/12
    - http://ergast.com/api/f1/drivers/alonso
- If you need more information:
    - https://github.com/martincarrera/clash-royale-api
    - https://pokeapi.co/
    - http://ergast.com/mrd/
- You can use any of the images provided as sprites in the pokemon API.

## Optional
- Use some cache system
- Use some reverse id system

## Test

Added test to prove endpoints. To execute, run `npm test`
