# All Tests

## childApi.test.js

#### POST: verifies a child profile can be created:
  * with only a name
  * with an array of custom tries, added as strings
  * with an array of custom tries, added as ObjectId strings

#### GET: verifies child profiles can be returned
  * with only a name in the profile / base case
  * the correct number of profiles is returned
  * a child's tries are returned in order
  * a specific child can be returned
  
#### DELETE: verifies a child profile can be deleted
  * the correct profile is deleted

#### PUT: verifies a child profile can be changed
  * a child's name can be changed
  * an array of tries can be added to an existing child
  * a child's list of tries can be replaced

## introApi.test.js

#### POST: verifies an intro can be created
  * correctly
  * adding the current date
  * with a try property
  * and the new intro is added to the child's intros

#### GET: verifies intros can be read
  * correctly
  * for a specific child, in order

#### DELETE: none

#### PUT: none

## tryApi.test.js

#### POST: verifies TryHintArray can be created
  * an array of new Tries can be added in order to create TryHintArray
  * only one TryHintArray can be added to the database

#### GET: verifies TryHintArray can be returned
  * all tries can be retrieved correctly
  * a try can be retrieved by id
  * the array of Try Hints is complete and in order

#### DELETE: verifies delete works as expected
  * deleting a try marks it inactive

#### PUT: none

## Coverage

| Route | Request | Covered | Not in DB | Bad Req |
| ----- | ------ | ----- |----- | --- |
| /child | GET |  yes | | -
| /child | POST | yes | - |
| /child/:id | GET | yes |  | -
| /child/:id | DELETE | yes | - | -
| /child/:id | PUT | yes | |
| /child/:id/tries | GET | yes | | -
| /child/:id/tries/ | PUT | yes | |
| /intro/ | GET | yes | | -
| /intro/:childId | POST | yes | - | 
| /intro/:childId | GET | yes | | -
| /intro/:id | DELETE |  | - | -
| /intro/:id | PUT | | |
| /try | GET | yes | | -
| /try/:id | GET | yes | | -
| /try/:id | DELETE | yes | | -
| /try-hint | GET | yes | | -
| /try-hint | POST | yes | - |
| /try-hint | DELETE | |  | -

Only happy path so far.  
Add not found in db tests

