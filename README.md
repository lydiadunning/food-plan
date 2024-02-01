# Food-Plan

*a temporary name*

A web app for parents to use to track foods that have been offered to a child, built with flexibility to support families with different needs.

## What Problem Does it Solve

When raising a picky kid you're supposed to offer new foods over and over again. 
Parents and experts have many conflicting opinions about the best way to expand a palate. Regardless of the approach a parent takes, one of the most basic yet most challenging parts of feeding a child is serving them foods they don't want to eat, over and over and over.  The typical child can take 15-20 tries to accept some foods, and pickier kids can need twice as many.  It's hard to see tiny baby steps like taking a bite and spitting it out, smelling something and pulling a face, or not throwing a refused food on the floor as positives. 

All the feed-your-kid apps I've found have been kid-targeted, with lots of flashy rewards and persuasion. 
They don't help parents track how regularly they're introducing foods, they don't recognize baby steps, and they risk putting pressure on kids who feel anxious or inadequate during mealtime.

I wanted to build an app for collecting data about feeding kids, approaching the data in a way that centers the parents role in offering foods instead of whether the child eats them. I also want to allow parents to record very small wins specific to their unique situation.

## How To Run

### Live App
A live version of the app is available at [https://food-app.fly.dev/](https://food-app.fly.dev/). 
Log in as 'Example' with password 'example' to see the app in action without creating a profile. 
Logging in as 'Example' populates the app with default data.

### Local Version

* Clone a copy of this repo locally by entering 'git clone lydiadunning/food-plan' into your preferred command line interface.
* Place a .env file with the following contents in the backend folder:
```
MONGODB_URI= *a MongoDB URI*

TEST_MONGODB_URI= *a MongoDB URI linking to a separate collection for testing*

PORT= *a 4 digit number*
```
* Run the development version of the server with a CLI by entering `npm run dev` in the backend folder.
* Run the development version of the frontend interface with a CLI by entering `npm run dev` in the frontend folder.

## Testing

Go to `/backend/tests` to see automated endpoint tests and documentation of testing progress.

### Running Tests

To run tests, navigate to the backend folder in terminal and type `npm run test`. To run a subset of tests, enter `npm run test -- tests/ *filename* `

### Technologies
#### Backend
Node.js with Express. Uses mongoose to access MongoDB. Manages password encryption with bcryptjs and uses json web tokens to authenticate users. Backend endpoint testing with Jest.

#### Frontend
React.js, no framework, build with Vite. Accesses backend with axios and manages server state with react-query. Manages forms with react-hook-form. Styled with Radix UI themes and primitives.


## Next Steps in Development

### Now

### Next
* Make sure deleting or editing one kid doesn't remove other kids.
* Ensure login functionality works properly
  * Test edgecases and improve error detection
* Fix app getting lost on refresh

### For Later
* Review responses: correct HTTP code? enough information? 

* Improve input validation in endpoints.

* On frontend, filter outcomes by active and inactive, and make sure inactive outcomes that have been used in an exposure are not deleted.

* use fuzzy searching, maybe incorporate soundex. Find some solution to repeating words with different capitalization, pluralization, or spelling.

* list values and goals to guide the design process.

