# All Tests

## childApi.test.js

#### POST: verifies a child profile:
  * can be created with only a name
  * can be created with an array of custom tries, added as strings
  * can be created with an array of custom tries, added as ObjectId strings
  * can be created with an array of try hints
  * cannot be created with no name
  * with intros
    * can add intros
    * a child that doesn't exist can't add an intro
    * an intro will default to the current date
    * an intro can be added with a try

#### GET: verifies child profiles can be returned
  * with only a name in the profile / base case
  * the correct number of profiles is returned
  * a child's tries are returned in order
  * a specific child can be returned
  * children will not be returned if none in database
  * response when specific child not in database
  * response when getting tries for nonexistant child
  * the child's intros can be returned
  * response when querying nonexistant child's intros
  
#### DELETE: verifies a child profile can be deleted
  * the correct profile is deleted
  * behaves normally when deleting a nonexistant child

#### PUT: verifies a child profile can be changed
  * a child's name can be changed*
  * an array of tries can be added to an existing child
  * a child's list of tries can be replaced
  * response when adding tries to nonexistant child
  * response when updating nonexistant child
  * cannot update child with invalid data

## introApi.test.js

#### POST: none

#### GET: verifies intros can be read
  * correctly
  * a nonexistant intro doesn't cause problems

#### DELETE: verifies the intro can be deleted
  * correctly

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
| /child | GET |  yes | yes | -
| /child | POST | yes | - | yes
| /child/:id | GET | yes | yes | -
| /child/:id | DELETE | yes | yes | -
| /child/:id | PUT | yes | yes | yes
| /child/:id/tries | GET | yes | yes | -
| /child/:id/tries/ | PUT | yes | yes |
| /child/:id/intro/ | POST | yes | yes |
| /child/:id/intro | GET | yes | yes | -
| /intro/ | GET | yes | yes | -
| /intro/:id | DELETE |  | - | -
| /intro/:id | PUT | | |
| /try | GET | yes | | -
| /try/:id | GET | yes | | -
| /try/:id | DELETE | yes | | -
| /try-hint | GET | yes | | -
| /try-hint | POST | yes | - |
| /try-hint | DELETE | |  | -

Only happy path so far.  
To improve error handling:
Add tests for querying items that aren't in the database  
Add tests where the request body lacks essential data   
| child | intro | try |
|--|--|--|
| no name | no food | no try
| | no description | 

