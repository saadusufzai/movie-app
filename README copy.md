# Techwa Movie App using React, Redux and SaSS

## Libraries Used

- react-redux
- redux-toolkit
- axios
- react-star-ratings
- d3

About the App: The App contains total three pages/routes:

- Home
- details
- Stats

## Home Page

- user can sort the movies by clicking the sort button, the movies by default comes sorted as 10-0 by rating .
- user can search any movie in the search bar and new movies will replace the old ones on the home page.
- user can not sort the searched movies only.
- user can go to the details page by hovering and clicking on the detail button on each move tile.

## Detail page

- user can see the details of the movie and similar movies.
- user can rate the movie from 1 to 10 and the rating will be sent to tmdb. A guest session id will be generated and a POST request will be sent.(I have not resigned any action for this event)
- user can click on the movies below to see the details

## Stats page

stats page contain two d3 graphs

- first graph shows the top 10 movies by rating
- second graph shows the top 10 movies by vote count

#### Note: The Home page and Details page is fully responsive but unfortunately the stats page is not fully responsive and it was because of the reason mentioned above.
