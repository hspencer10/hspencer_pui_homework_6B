# hspencer_pui_homework_6B

6B Reflection
Helena Spencer
4/4/2022

Links

Firebase: https://pui-hw6b.web.app 

Github: https://github.com/hspencer10/hspencer_pui_homework_6B 

Challenges

Conceptual
There were a couple conceptual challenges that I had faced while going throughout this assignment. The biggest challenge I had faced was determining how to get information from one page shared to another, especially in the case of displaying a detail page for each course. After hours of research, I was finally able to attend OH to get clarification on this issue. I was able to solve this problem by using localStorage as almost a middle man and would save the key information I needed in between transitions from page to page. Going forward, this problem could be mitigated by just storing information that I know will come up on other pages in localStorage to begin with and then pulling it whenever needed from there.

Another, more low level, conceptual problem I faced was determining how to populate the calendar on the homepage since it is built using a grid display system. I have never worked with grids before in Javascript so this was a huge learning curve for me and required hours of learning the material, how to manipulate it, and then executing the necessary functions how I needed it to work. Going forward, I hope this obstacle is a little easier to avoid since I am more familiar with grid systems and have a basic understanding of what I need to do in order to carry out my designs for this platform.

Technical
Some of my technical obstacles stemmed from my conceptual challenges which didn’t help since I not only had to take the time to understand what I needed to do/use for my program, but then also but in time to learn how to code it and put it together technologically. Using various tutorials or platforms that teach you about JS have helped a lot such as W3 School and StackOverflow but a lot of the progress made was from trial and error as well as implementing break points and the console. I also found that it helped to first comment steps of what I was trying to accomplish and then try to find the code that helped me fulfill those steps. To mitigate most of the technical issues I faced, I can do a better job of starting small with very simple lines of code that I can understand to make sure I can get basic functionality and then build off of that instead of trying to go from 0 to 100 in one iteration.

Deploying
This challenge is very small but there are some functionalities that are not working with my Firebase link. For example, I had made it so that you cannot click on the “Plan”, “Register”, and “Requirements” pages which works when I pull up the file from my locally stored folders but not when I access the application from the hosting URL. I’m not sure how much of a penalty this is but I did try to make it so that the user wouldn’t be able to open these pages since there is no content on them yet.

Programming Concepts

One concept I became very familiar with that I hadn’t been before was the concept of using classes versus ID’s when referencing different elements. For instance I learned that classes return nodes when using .getElementByClass and that using an ID returns just a singular object. This makes it way easier to call elements rather than having to parse through all the nodes returned by classes.

Another concept I learned very in depthly about is localStorage. I had never heard of this type of storage before and the fact that you can delete storage if it becomes messed up and restart is something that I found very useful. Although it does suck that everything has to be stored as a string, using the JSON.stringify really makes the process go a lot smoother.

One concept that I also found myself using way more than I had originally thought was div tags. I knew that they were useful for referencing a large group of items before but once I found out that it actually can be used for layout techniques and helping stack different elements ontop of eachother, it made the code more understandable and easier to determine how to accomplish the designs I was going for.

My fourth concept that I learned was modals as a whole. I knew that alert boxes existed but for some of my functionalities that I wanted to implement, I knew that simple alert boxes weren’t going to cut it. This is when I found modals and figured out how to show/hide them depending on the state of the system. I found these excellent ways to communicate feedback to the user.

The last concept I learned was learning how to manipulate tables and grids. I used both of these concepts for displaying my different calendar views, both on the main page and the course details page. Once I was able to do some research on the functionalities of the two and the types of flexibilities they each provide, I found these elements to be way more useful than just using regular div-containers. The fact that you can use a grid system and specify exactly how many rows/columns you need and can assign an element to an exact cell, blew my mind.
