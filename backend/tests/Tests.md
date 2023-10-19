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
