# Image-Processing-using-Transfer-Learning-with-Neo4j
A image recognition (basically classification) system build uisng [p5.js](https://p5js.org) & [ml5.js](https://ml5js.org) libraries. Making use of node.js and a graph based NoSQL database, [Neo4j](https://neo4j.com)
Implementing transfer learning.

# How to get started
First you would require Neo4j and the below code for its driver. (Refer file public/index.html)
```Javascript
<!--Below is the precious driver code -->
		<!-- unpkg CDN non-minified -->
		<script src="https://unpkg.com/neo4j-driver"></script>
		
```

Refer to file public/test1.js to see how to connect neo4j with javascript or refer to [neo4j docs](https://neo4j.com/docs/)


Next thing you would need is Node.js in your system and install the following modules
<ul>
  <li><b>Express</b> - use code ->npm install --save express </li>
  <li><b>Socket.io</b>- use code -> npm install --save socket.io </li>
</ul>

Now you are ready to go , run Server.js form node.js and your program will run at localhost:3000

# How the code works

To know how to use Neo4j with javascript visit file Public/neo.js

You will run the server.js file through node.js which will run the file Public/index.html at localhost:3000 using socket.io.

The file Public/index.html has the Neo4j driver code , socket.io , p5.js and ml5.js. It also runs the file Public/test.js which has the code for transfer learning and neo4j


