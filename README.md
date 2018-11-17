## Authentication

[MongoDB Install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

To look at the database:

[RoboMongo](https://robomongo.org/)

To run the MongoDB database:

```
$ mongod

```

### Cookies vs Tokens

* `Cookies` - Automatically included on all requests, Unique to each domain, cannot send to different domains
* `Token` - Have to manually wire up, can be sent to any domain

`JSON WEB TOKEN` - `JWT`

Signing up or signing in:

```
User ID + Secret String = JSON WEB TOKEN

```

When the user makes authenticated requests

```
JSON WEB TOKEN + Secret String = User ID

```

[JWT Information](https://jwt.io/s)
