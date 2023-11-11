# All Tests

## kidApi.test.js

#### POST: verifies a kid profile:
  * can be created with only a name
  * can be created with an array of custom outcomes, added as strings
  * can be created with an array of custom outcomes, added as ObjectId strings
  * can be created with an array of outcome hints
  * cannot be created with no name
  * with exposures
    * can add exposures
    * a kid that doesn't exist can't add an exposure
    * an exposure will default to the current date
    * an exposure can be added with a outcome

#### GET: verifies kid profiles can be returned
  * with only a name in the profile / base case
  * the correct number of profiles is returned
  * a kid's outcomes are returned in order
  * a specific kid can be returned
  * kids will not be returned if none in database
  * response when specific kid not in database
  * response when getting outcomes for nonexistant kid
  * the kid's exposures can be returned
  * response when querying nonexistant kid's exposures
  
#### DELETE: verifies a kid profile can be deleted
  * the correct profile is deleted
  * behaves normally when deleting a nonexistant kid

#### PUT: verifies a kid profile can be changed
  * a kid's name can be changed*
  * an array of outcomes can be added to an existing kid
  * a kid's list of outcomes can be replaced
  * response when adding outcomes to nonexistant kid
  * response when updating nonexistant kid
  * cannot update kid with invalid data

## exposureApi.test.js

#### POST: none

#### GET: verifies exposures can be read
  * correctly
  * a nonexistant exposure doesn't cause problems

#### DELETE: verifies the exposure can be deleted
  * correctly

#### PUT: none

## outcomeApi.test.js

#### POST: verifies OutcomeTipArray can be created
  * an array of new Outcomes can be added in order to create OutcomeTipArray
  * only one OutcomeTipArray can be added to the database

#### GET: verifies OutcomeTipArray can be returned
  * all outcomes can be retrieved correctly
  * a outcome can be retrieved by id
  * the array of Outcome Hints is complete and in order

#### DELETE: verifies delete works as expected
  * deleting a outcome marks it inactive

#### PUT: none

## Coverage

| Route | Request | Covered | Not in DB | Bad Req |
| ----- | ------ | ----- |----- | --- |
| /kid | GET |  yes | yes | -
| /kid | POST | yes | - | yes
| /kid/:id | GET | yes | yes | -
| /kid/:id | DELETE | yes | yes | -
| /kid/:id | PUT | yes | yes | yes
| /kid/:id/outcomes | GET | yes | yes | -
| /kid/:id/outcomes/ | PUT | yes | yes |
| /kid/:id/exposure/ | POST | yes | yes | 
| /kid/:id/exposure | GET | yes | yes | -
| /exposure/ | GET | yes | yes | -
| /exposure/:id | DELETE |  | - | -
| /exposure/:id | PUT | | |
| /outcome | GET | yes | | -
| /outcome/:id | GET | yes | | -
| /outcome/:id | DELETE | yes | | -
| /outcome-hint | GET | yes | | -
| /outcome-hint | POST | yes | - |
| /outcome-hint | DELETE | |  | -

Only happy path so far.  
To improve error handling:
Add tests for querying items that aren't in the database  
Add tests where the request body lacks essential data   
| kid | exposure | outcome |
|--|--|--|
| no name | no food | no outcome
| | no description | 

