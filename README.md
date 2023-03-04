# AWAproject

Technology choices: 
--
Node: 19.5.0 (Currently using 64-bit executable) \
Although node 12 was used thorough the course, create-react-app needed node 14 or higher, so the newest version of node was the choice \
Express was used as a additional framework. Nodemon was used to ease the development process. \
-- \
Database: MongoDB \
-- \
Authentication: jwt \
Token is saved as a cookie in client, which in retroperspect was unnecessary \
-- \
Responsive design: Material UI \
Flex is used. Use of grid was as well an option. Header buttons fold into HamburgerMenu in mobile/smaller screen. \
-- \
Documentation: Written in README (this). 

Installation guidelines: 
--
MongoDB is running in mongodb://127.0.0.1:27017/project \
Server needs a .env that includes the SECRET \
Running npm install in project root should install the dependent packages in client and server \
Running npm run dev in project root should run the server and client \
Server is running in port 1234 and client in port 3000 

User manual: 
--
The Home page can be accessed through url: localhost:3000. \
On the top of the page there is a header. On the right side there is the language selection (FI/EN). EN is default.  \
On the left side there is Home, Login and Register buttons. Login and Register fold into HamburgerMenu in smaller screen. \
On the Home page there are the posts and they are clickable. After clicking a post, page is reloaded to show the comments related to the post.  \
After pressing submit button anywhere in the page, a infotext should be shown.  \
To see the comment or post added one needs to refresh the page.  \
MongoDB structure can be seen in models.  \
Login and Register pages are quite self explanatory. When registering username needs to be atleast 3 characters long and password 5.  


Features: 
--
Basic Features: 25 \
Utilization of a frontside framework, React: 5 \
Translation of the whole UI in two or more languages: 2 \
Header and clean UI: 5 \
Points: 37
