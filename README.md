# Criminal MEAN

Combines the solution from from <a href="" target="_blank">Angular `$http` criminal app lab</a> with the MEAN stack starter app from <a href="https://github.com/sf-wdi-22-23/mean-stack-starter" target="_blank">A Student's Guide to Building MEAN Stack Applications</a>.

Notes:

* Don't forget to `npm install` and have `mongod` running to test the code.

* Create an `app/config/env.json` file and add the following database configuration information:

	```json
	{
		"development": {
			"db": "mongodb://localhost:27017/infamous-masterminds"
		},
		"production": {
			"db": "<production database url>"
		}
	}
	```