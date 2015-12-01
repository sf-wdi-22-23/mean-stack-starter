![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# A Student's Guide to Building MEAN Stack Applications

Taken from mean.io:

"MEAN is an opinionated fullstack javascript framework - which simplifies and accelerates web application development. MEAN stands for:

- __MongoDB__ - the leading NoSQL database, empowering businesses to be more agile and scalable
- __Express__ - a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications
- __AngularJS__ - lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop
- __Node.js__ - a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications"



## Context

The intention of this documentation and corresponding application is to provide an example MEAN stack app built with professional, opinionated conventions and meant to serve as a style guide, of sorts. Students can use the source code as a guiding example as they work through projects and exercises.

Unlike Rails, there is no standard convention for structuring MEAN stack applications. The structure we will be demonstrating in WDI is just one of many approaches you will likely come across.

## Application Structure

The code for this application is broken into two folders: an `app` folder and a `public` folder. The majority of server-side code will be in `app` and all client-side code will live within `public`. Building out the application in this way helps clarify the purpose of each file and code block.

Please refer to these lines within `server.js`:

```javascript
app.use('/api', apiRouter);
```
The use of this router middleware serves as the gateway to the back-end.  When you trace its path from `server.js`, it looks something like router > controllers > model.

The code below is the app's gateway to the front-end. As you can see, this "gateway" points to code that is within our `public` folder:

```javascript
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});
```

The file and folder directly should be as follows:

```
- app/
    - config/
        - config.js
        - env.json
        - routes.js
    - models/
        - Article.js
    - controllers/
        - articles-controller.js

- public/
    - app.js
    - css/
      - style.css
    - assets/
      - logo.png
    - components/
      - articles/
        - articles-view.html
        - articles-controller.js
        - articles-service.js
      - article-form/
        - article-form-view.html
        - article-forms-controller.js
    - services/
        - api-service.js
      - directives/
        - some-custom-directive.html

- node_modules/
    - *

- package.json

- server.js
- .gitgnore
```

## app/

As previously explained, this is where the server-side code lives.

#### config/
The config (configuration) folder is where you dictate the structure of the back-end of your web application.

**_routes.js_**

Your routes file defines what controller will be used to handle endpoints being hit by varying HTTP methods:

```javascript
...
apiRouter.route('/articles')

  .post(articlesController.create)

  .get(articlesController.index);

apiRouter.route('/articles/:article_id')

  .get(articlesController.show)

  .patch(articlesController.update)

  .delete(articlesController.destroy);

...
```

**_env.json_**

The env.json file, short for environments.json, is used to describe environment-specific data and variables for your application. For example, when in a development environment, use the local database URI and API test tokens and secrets; when in a production environment, use the production database URI and API real tokens and secrets.

```
{
  "development": {
    "db": "<local  database URI>",
    "api": {
      "facebook": {
        "token": "<fb token>",
        "secret": "<fb secret>",
      }
      "instagram": {
        "token": "<ig token>",
        "secret": "<ig secret>",
      }
    }
  },
  "production": {
    "db": "<production database URI>"
  }
}
```

**_config.js_**

Config.js (configuration) will be run within your `server.js`.  Based on the environment your server is running in, it will access the appropriate environment variables from env.json:

```javascript
var environment = require('./env.json');

exports.config = function() {
  var node_env = process.env.NODE_ENV || 'development';
    // this will return the key-value pairs from the env.json based off the environments
  return environment[node_env];
}
```

#### models/

**_Article.js_**

The line `var Schema = mongoose.Schema;` allows us to create a constructor for our Article model. The model's schema are assigned to the `ArticleSchema` variable and define data structure and datatypes.  Finally, the `ArticleSchema.pre()` block defines the pre-hook for the document
and sets the `created_at` value before persistence.

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  author: String,
  created_at: Date,
  votes: {type:Number, default: 0},
  content: String
});

ArticleSchema.pre('save', function(next){
  this.created_at = new Date();
  next();
});

module.exports = mongoose.model('Article', ArticleSchema);
```

#### controllers/

All controller files belong to this folder.

Follow a standard CRUD controller function naming convention:


| HTTP METHOD | Controller Name |
| :---------: | :-------------: |
| GET (all)   | index           |
| GET (show)  | show            |
| POST        | create          |
| PATCH       | update          |
| DELETE      | destory         |


**_articles-controller.js_**

The `request.article = article;` snippet stores the article in a request and `next()` is a callback used to move onto the next handler.

```javascript
var Article = require('../models/Article');

function articleById(request, response, next, id) {
  Article.findById(id, function(error, article) {
    if (error) console.error('Could not update article b/c:', error);

    request.article = article;
    next();
  });
}

...

function show(request, response) {
  response.json(request.article);
}

...

module.exports = {
  articleById: articleById,
  create: create,
  index: index,
  show: show,
  update: update,
  destroy: destroy
};
```

When we export all functions as an object, it helps serve as a reference to all controller functions within the file.

## public/


This is where client-side code lives.

***_app.js_***

The mother of your angular app. `app.js` is where you create your angular module and inject any necessary dependencies.

### components/

A simpler and logical way to structure this application would be to have all controllers within a controllers folder and all views within a views folder. Although this layout may suffice for the majority of the simple applications students and instructors will build, it does not take into account scalability.  It also doesn't address the often implemented concept of components.

Building with scale in mind, it is best to structure your app based off components. In this way, you can find all related code quickly since relative files will be grouped together.

For example,

```
  - articles/
    - articles-view.html
    - articles-controller.js
  - article-form/
    - article-form-view.html
    - article-forms-controller.js
```

Imagine an application with 10+ controllers and views. The file structure above is a lot easier to navigate compared with:

```
  - controllers/
    - articles-controller.js
    - article-forms-controller.js
  - views/
    - articles-view.html
    - article-form-view.html
```

Further, as newer technologies such as Angular 2.0 and React, which are component-based, become adopted, this application structure can help ease the learning curve and speed up a student's transition in learning any of these frameworks.

#### services/

All services files, such as API services, will go within this folder. They are not specific to components since they can be purposed across various controllers.

***_api-service.js_***

```javascript
angular.module('reddit')

.factory('apiService', ['$http', function($http) {
  return {
    index: function() {
      return $http.get('/api/articles')
      .then(function(response) {
        var articles = response.data;
        console.log('articles:',articles)
        return articles
      });
    },
    create: function(article) {
      $http.post('/api/articles', article);
    }
  }
}]);
```

**.gitignore**

```javasript
node_modules/*
app/config/env.json
```

Since your `node_modules` will have to be installed in the environment that your server is running, whether it's on a co-developer's machine or on a production server, it is not necessary to have your node_modules pushed up to the remote repository. One of the purposes of the `package.json` file is to serve as documentation of what dependencies must be installed.

We also don't want to push our `env.json` file since it can contain sensitive information such as API token data and production database URIs.

***disclaimer:***

You will have to build out your own `env.json` file since it cannot be cloned from the remote repository.

> Author's Note: All angular code should be built with `$scope` opposed to `controllerAs` syntax because there are no nested controllers.
