let features;
let video;
let knn;
let ready=false;
let label='Wait';
let imageNumber=0;

function preload()
{
    video=createCapture(VIDEO);
    video.hide();
	knn=ml5.KNNClassifier();
  
    features= ml5.featureExtractor('MobileNet',modelReady);
}


function function1(i,node)
				{
					let FIELD=node._fields[0];
					let img=createImg("Images\\"+FIELD.properties.URL, function(){
                    
					var logits=features.infer(img);
                    knn.addExample(logits, FIELD.properties.Label );
					
                    imageNumber++;
                  }).hide();
				   
				}



function modelReady()
{
    console.log('Model is Ready');
  
  
    const driver = neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "1234"));
	const session = driver.session();

	const resultPromise = session.writeTransaction(tx => tx.run(
				'Match(n) return n;') );
  
        resultPromise.then(result => {
				session.close();
                console.log('**');
          
                const node=result.records;
				
				

			   for( i=0;i<node.length;i++)
                {
					function1(i,node[i]);
					
					/*FIELD=node[i]._fields[0];
					img=createImg("Images\\"+FIELD.properties.URL, function(){
                    
					var logits=features.infer(img);
                    knn.addExample(logits, FIELD.properties.Label );
					
                    imageNumber++;
                  }).hide();
				    
                */
				}
				
          
          
          
                // on application exit;          
                driver.close();                
        }).then(function (){console.log('PreLoad complete'); ready=true;}).catch(err=>{console.log(err)}); 
  
    

    
}

function videoReady()
{
    console.log("Video is Ready");
}

function saveTheImage()
{
    saveCanvas(imageNumber+".jpg");
  
    const driver = neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "1234"));
	const session = driver.session();

	const resultPromise = session.writeTransaction(tx => tx.run(
				'CREATE(n:Image{Label : $L , URL: $U})', {L : input.value(), U : imageNumber+'.jpg'}) );
  
        resultPromise.then(result => {
				session.close();
                console.log('**');
          
                // on application exit;          
                driver.close();                
        }).catch(err=>{console.log(err)}); 
     
    imageNumber=imageNumber+1;
  
}

function setup() {
  // put setup code here
    
    createCanvas(640, 480);
    background(0);
    
    
    
    input=createInput();
    input.position(20,height+40);
    
  
    butt=createButton("Train Machine");
    butt.position(20+input.width,height+40)
    butt.mousePressed(function ()
    {
        var logits=features.infer(video);
        saveTheImage();
        knn.addExample(logits, input.value());   ///**////
        console.log(logits);
    });
    
              

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
    image(video,0,0,video.width,video.height);
      
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
           textSize(26);
           frameRate(10);
           fill(random(255),random(255),random(255));
           //rotate(random(2*PI));2
           text(label, 0,470);
           pop();
		   //console.log(label);
   }

        
}