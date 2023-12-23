# Food-Plan

*a temporary name*

A web app for parents to use to track foods that have been offered to a child, built with flexibility to support families with different needs.

## Current Working Branch

This app's backend is being refactored with different variable names and endpoints and a simplified data model, as well as user authentication. 
See the most recent branch: [New Names](https://github.com/lydiadunning/food-plan/tree/NewNames).
Note that most endpoint tests will pass in that branch, but the front end hasn't been updated yet.

## What Problem Does it Solve

When raising a picky kid you're supposed to offer new foods over and over again. 
Parents and experts have many conflicting opinions about the best way to expand a palate. Regardless of the approach a parent takes, one of the most basic yet most challenging parts of feeding a child is serving them foods they don't want to eat, over and over and over.  The typical child can take 15-20 tries to accept some foods, and pickier kids can need twice as many.  It's hard to see tiny baby steps like taking a bite and spitting it out, smelling something and pulling a face, or not throwing a refused food on the floor as positives. 

All the feed-your-kid apps I've found have been kid-targeted, with lots of flashy rewards and persuasion. 
They don't help parents track how regularly they're introducing foods, they don't recognize baby steps, and they risk putting pressure on kids who feel anxious or inadequate during mealtime.

I wanted to build an app for collecting data about feeding kids, approaching the data in a way that centers the parents role in offering foods instead of whether the child eats them. I also want to allow parents to record very small wins specific to their unique situation.

## How To Download and Run

*This app is not yet hosted.*
The hosted site will be linked from the About section of this project's repo on GitHub.

* Clone a copy of this repo locally by entering 'git clone lydiadunning/food-plan' into git bash, terminal, command prompt, or another command line interface.
* Place a .env file with the following contents in the backend folder:
```
MONGODB_URI= *a MongoDB URI*

TEST_MONGODB_URI= *a MongoDB URI linking to a separate collection for testing*

PORT= *a 4 digit number*
```
* Run the development version of the server with a CLI by entering `npm run dev` in the backend folder.
* Run the development version of the frontend interface with a CLI by entering `npm run dev` in the frontend folder.

## Testing

Go to `/backend/tests` to see unit tests and documentation of testing progress.

### Running Tests

To run tests, navigate to the backend folder in terminal and type `npm run test`. To run a subset of tests, enter `npm run test -- tests/ *filename* `
## Next Steps in Development

### Now
* Fix up data inputs and outputs, esp. exposures
  * Add an outcome menu for exposures, allowing users to select more than one outcome.
  * Make the Date look better

### Next
* Ensure all endpoints used for current frontend functionality are present and work as expected.
* Add components nested in views that aren't on the App page to currentView component switch

### For Later
* Review responses: correct HTTP code? enough information? 

* Improve input validation in endpoints.

* Ensure information sent to frontend is complete and strings are returned in an attractive format.

* On frontend, filter outcomes by active and inactive, and make sure inactive outcomes that have been used in an exposure are not deleted.

* Redesign outcome options to allow for several groups of outcome options arranged into an object to address different scenarios. This gives users a few different ways to think about how they can measure progress.
```
{
  baseCase: 'I offered it',
  behavior: [
    'left it on the plate',
    'stayed at the table',
    'spat into napkin'
  ],
  interaction: [
    'poked',
    'sniffed',
    'tasted',
    'ate'
  ]
}
```

* use fuzzy searching, maybe incorporate soundex. Find some solution to repeating words with different capitalization, pluralization, or spelling.

* list values and goals to guide the design process.