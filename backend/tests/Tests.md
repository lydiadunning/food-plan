# All Tests

## childApi.test.js

### POST: verifies a child profile can be created:
  * with only a name
  * with an array of custom tries, added as strings
  * with an array of custom tries, added as ObjectId strings

### GET: verifies child profiles can be returned
  * with only a name in the profile / base case
  * the correct number of profiles is returned
  * a child's tries are returned in order
  
### DELETE: verifies a child profile can be deleted
  * the correct profile is deleted

### PUT: verifies a child profile can be changed
  * an array of tries can be added to an existing child
  * a new try can be added to a child's list of tries

## introApi.test.js

### POST: verifies an intro can be created
  * correctly
  * adding the current date
  * with a try property
  * and the new intro is added to the child's intros

### GET: none

### DELETE: none

### PUT: none

## tryHintApi.test.js

### POST: verifies TryHintArray can be created
  * an array of new Tries can be added in order to create TryHintArray
  * only one TryHintArray can be added to the database

### GET: verifies TryHintArray can be returned
  * the array of Tries is complete and in order.

### DELETE: none

### PUT: none


| Route | Request | Covered |
| ----- | ------ | ----------- |
| /child | GET |  yes  |
| /child | POST | yes |
| /child/:id | GET |  |
| /child/:id | DELETE | yes |
| /child/:id | PUT |  |
| /child/:id/tries | GET | yes |
| /child/:id/tries/ | PUT | yes |
| /intro/ | GET | yes |
| /intro/:childId | POST | yes |
| /intro/:id | DELETE | |
| /intro/:id | PUT | |
| /try | GET | |
| /try/hints | GET | yes |
| /try/hints | POST | yes |
| /try/deactivate/:id | PUT | |
| /try/hints | DELETE | | 