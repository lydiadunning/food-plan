# Food-Plan

*a temporary name*

A web app for parents to use to track foods that have been offered to a child, built with flexibility to support families with different needs.

## What Problem Does it Solve

When raising a picky kid you're supposed to offer new foods over and over again. 
Parents and experts have many conflicting opinions about the best way to expand a palate. Regardless of the approach a parent takes, one of the most basic yet most challenging parts of feeding a child is serving them foods they don't want to eat, over and over and over.  The typical child can take 15-20 tries to accept some foods, and pickier kids can need twice as many.  It's hard to see tiny baby steps like taking a bite and spitting it out, smelling something and pulling a face, or not throwing a refused food on the floor as positives. 

All the feed-your-kid apps I've found have been kid-targeted, with lots of flashy rewards and persuasion. 
They don't help parents track how regularly they're introducing foods, they don't recognize baby steps, and they risk putting pressure on kids who feel anxious or inadequate during mealtime.

I wanted to build an app for collecting data about feeding kids, approaching the data in a way that centers the parents role in offering foods instead of whether the child eats them. I wanted to allow parents to record very small wins specific to their unique situation.

## How To Download and Run

*This app is not hosted as of writing this.*
The hosted site will be linked from the About section of this project's repo on GitHub.

* Clone a copy of this repo locally by entering 'git clone lydiadunning/food-plan' into git bash, terminal, command prompt, or another command line interface.
* Place a .env file with the following contents in the backend folder:
```
MONGODB_URI= *a MongoDB URI*

TEST_MONGODB_URI= *a MongoDB URI linking to a separate collection for testing*

PORT= *a 4 digit number*
```
* Run the development version of the server with a CLI by entering `npm run dev` in the backend folder.
* Run the development version of the frontend interface with a CLI by entering `npm run dev` in the second food-plan folder.

## Next Steps in Development

### For Now, Simplify and Edit the Schemas in the Backend. 
  1. Rename 'try' and 'child'. These are programming terms, which makes them difficult to talk about and causes trouble when naming variables. Reconsider all names currently used in the database.
    * Child => kid. The simplest synonym.
  2. Relocate 'intros' into the child model, and modify server endpoints and behavior to accomodate this change.
  3. Consider relocating 'tries' into the child model. 
  4. Experiment with file structure.
  5. Write a list of values to guide design choices. Avoid assumptions and judgement.

try: a menu item describing what a child does when given a food
Arranged into an order similar to an exposure ladder, included in the app to identify if the child gets stuck at a certain step for more than 15 attempts. Could be something like "sniff", "taste", or "leave on the plate". Saved in an array in a meaningful order chosen by the user. I'm not sure where inactive items will fall in the array.

Tries are only for measuring how a child interacts with the food. Not what it is, or how it was presented.



Intros => Exposures
Tries => Outcomes
Children => Kids
TryHints => OutcomeTips

### For Later
* Be more deliberate about HTTP request types. Change single-element-edit server requests to use PATCH rather than PUT.

* Review responses: correct HTTP code? enough information? 

* Improve input validation in endpoints.

* Ensure information sent to frontend is complete and strings are returned in an attractive format.

* On frontend, filter tries by active and inactive, and make sure inactive tries that have been used in an intro are not deleted.

* Allow intros to include more than one try

* Redesign try hints to allow for several groups of tries arranged into an object to address different scenarios. This gives users a few different ways to think about how they can measure progress.
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

* actually implement users and authentication. Go with JWT.
