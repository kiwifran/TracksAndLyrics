Hello! This is a music search app. Users can type in track or artist name to search for related tracks, and the app will make the first API call to fetch data from Itunes API and display search results on the page. Then, user can check the lyrics of a specific song by double clicking on the track's name, which will prompt the app to make the second API call to the Apiseeds lyrics API to fetch data and show it on the page. 

It is worth mentioning that when I designed the app, I prepared to display search results of similar tracks for users so I wrote this function in my scope outline, but when I was about to finish my basic function of the app, I found that the API I was using for my first API call didn't provide images, so I switched to Itunes API since the visual layout of my app relies heavily on images. Moreover, Itunes API doesn't have the method of searching for similar tracks that the former API I was using has, so I changed the first function of my app from showing similar tracks to showing general search results.


Thank you for reviewing my project!

My Thanks to:
1.The Icon of Music by Made x Made from the Noun Project, I used it in my favicon https://thenounproject.com/search/?q=music&i=2110791;
2.The header background image by Ameen Fahmy on Unsplash https://unsplash.com/@ameenfahmy_
3.Animista http://animista.net/
4.Itunes Search API https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/ and Apiseeds API https://apiseeds.com/.