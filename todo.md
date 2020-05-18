# TODO

## Styling
 * Make activity wider
 * Double check font stuff
 * Bold face
 * Bottombar shrink / test
   
## Scalability
 * Make the posts render ~ 20 at a time (also a backend issue)
 * Feed component: Profile picture object that maps each username to a profile pic so that multiple GETs don't need to be made. Also make a backend method to get JUST the profile picture of a user.

## Other
 * Only show activity for seniors
 * Profile pics
 * Backend route to get amount of posts, only call the backend GET_LAST_N_POSTS if that number is different (store in local storage)
   * Store this in IndexedDB??? LocalStorage? Definitely not a cookie.