function setup() {
  createCanvas(400, 400);
   	
        const driver = neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "1234"));
		const session = driver.session();

		const resultPromise = session.writeTransaction(tx => tx.run(
				'Match(n) return(n)'));
				resultPromise.then(result => {
				session.close();
		const singleRecord = result.records;
		console.log(singleRecord[1]._fields[0].properties['logist']);
		// on application exit:
                    
        driver.close();                
}); 
             
  
}

function draw() {
  background(220);
}