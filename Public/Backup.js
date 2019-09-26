// Just the transfer learning stuff 		NO Neo4j yet

let features;
let video;
let knn;
let ready=true;
let label='Need Data To Train On';


function modelReady()
{
    console.log('Model is Ready');
    
}

function videoReady()
{
    console.log("Video is Ready");
}


function setup() {
  // put setup code here
    
    createCanvas(640, 480);
    background(0);
    
    
    video=createCapture(VIDEO);
    video.hide();
    features= ml5.featureExtractor('MobileNet',modelReady);
    
    knn=ml5.KNNClassifier();
  
    input=createInput();
    input.position(20,height-40);
  
    butt=createButton("add Image");
    butt.position(20+input.width,height-40)
    butt.mousePressed(function ()
    {
        var logits=features.infer(video);
        knn.addExample(logits, input.value());   ///**////
        console.log(input.value());
    });
    
  
 /*--------------------------------------------------------------------------------------------*/	
/*		
        const driver = neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "1234"));
		const session = driver.session();
		const resultPromise = session.writeTransaction(tx => tx.run(
				'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',
					{message: 'hello, world'}));
				resultPromise.then(result => {
				session.close();
		const singleRecord = result.records[0];
		const greeting = singleRecord.get(0);
		console.log(greeting);
		// on application exit:
		driver.close();
                    
}); 
20+input.width+SubmitButton.width,height-40
*/
/*--------------------------------------------------------------------------------------------*/               

}

// function mousePressed()
// {
//   console.log(features.infer(video).dataSync());
//   //  features.infer(video).print()
    
// }

function doTheClassification()
{
    const logits=features.infer(video);
    knn.classify(logits,function(error,results){
        label=results.label;
        doTheClassification();
    })
}

function draw() {
  // put drawing code here
    background(200,200,200);
    image(video,0,0,video.width*0.5,video.height*0.5);
      
    if(ready  &&  knn.getNumLabels()>0)
    {
        doTheClassification();
        ready=false;
    }
  
//     fill(0);
//     textSize(32);
//     text(label,10,height-60);
    
    
       if (label != '') {
           push();
           textSize(16);
           frameRate(10);
           fill(random(255),random(255),random(255));
           translate(640*0.5,random(video.height*0.5)+0);
           //rotate(random(2*PI));2
           text(label, 10,0);
           pop();
   }

        
}
