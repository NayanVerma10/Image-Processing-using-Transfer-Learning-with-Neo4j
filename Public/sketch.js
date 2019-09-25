let mobilenet;
let predictor;
let video;
let label;
let input;
var n=0;
var a=new Array(10);
let butt;
let trainButt;
let SubmitButton;

function gotResult(error,results)
{
    if(error)
        console.error(error);
    else
    {
        label=a[results*10-1];
        predictor.predict(gotResult);
    }
}
function modelReady()
{
    console.log('Model is Ready');
    //mobilenet.predict(gotResult);
}

function videoReady()
{
    console.log("Video is Ready");
}

function whileTraining(loss)
{
    if(loss==null)
    {
        console.log("Training Complete");
        predictor.predict(gotResult);

    }
}


function setup() {
  // put setup code here
    
    createCanvas(640, 480);
    background(0);
    
    input=createInput();
    input.position(20,height-40);
    
    
    video=createCapture(VIDEO);
    video.hide();
    mobilenet= ml5.featureExtractor('MobileNet',modelReady);
    classifier=mobilenet.regression(video,videoReady);
    
    butt=createButton("add Image");
    butt.position(20+input.width+SubmitButton.width,height-40)
    butt.mousePressed(function ()
    {
        predictor.addImage((n+1)*0.1);   ///**////
    });
    
    
    traiButt=createButton("Train");
    trainButt.mousePressed(function ()
    {
        predictor.train(whileTraining);
    });
    
    for (var i = 0; i <= 10; i++)
    a[i] = ' ';

    SubmitButton=createButton("Add Name");
    SubmitButton.position(20+input.width,height-40);
    SubmitButton.mousePressed(function()
    {
        if(input.value()!='')
            {
                a[n++]=input.value();
            }
    })
    
    
    
    
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

*/
/*--------------------------------------------------------------------------------------------*/               

}

function draw() {
  // put drawing code here
    background(200,200,200);
    image(video,0,0,320,240);

    fill(0);
    textSize(64);
    text(label,10,height-20);
    
//    for (var i = 0; i < 10; i++)
//        if (a[i] != '') {
//            push();
//            textSize(16);
//            frameRate(2);
//            fill(random(255),random(255),random(255));
//            translate(random(320)+320,random(240)+240);
//            rotate(random(2*PI));
//            text(a[i], 10,0);
//            pop();
//    }

    for(var i=0;i<10;i++)
        if(a[i]!='')
            {
                textSize(12);
                text(a[i],320+20,20+i*20);
            }
        
}