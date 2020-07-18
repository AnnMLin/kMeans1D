//INPUT DATA : ARRAY
//INPUT K : NUMBER

function kMeans1D(data, k = 3, maxSteps = 20) {
  //1.RANDOMLY PICK K CENTER POINTS(CP)
  let c = data.slice(0, k)
  //OR MANUALLY ASSIGN C VALUES
  // let c = [1, 2, 3]
  console.log('c: ', c)
  
 
  let step = 0
  while(step < maxSteps) {
    let cpContainer = []
    let cpHash = {}

    //2.FOR EACH DATA, CALCULATE ITS DISTANCE^2 WITH EACH CP
    for(let i = 0; i < data.length; i++){
      //3.FIND THE CP THAT IS CLOSEST
      //GET data[i] TO EACH CP DISTANCE
      let cpIndex = c.reduce((cIndex, currentVal, idx) => {
        if(Math.abs(data[i]-currentVal) <= Math.abs(data[i]-c[cIndex])) {
          return idx
        }
        else {
          return cIndex
        }
      }, 0)

      let cp = c[cpIndex]
      console.log('data: ', data[i], '; ', 'cp: ', cp)

      //4.LINK DATA WITH THE CLOSEST CP
      // ADD TO 1D ARRAY OF MATCHING CPS, SAME LENGTH AS DATA ARRAY
      cpContainer.push(cp)

      // CREATE HASH
      if(!cpHash[cpIndex]) {
        cpHash[cpIndex] = []
      }
      // ADD TO HASH
      cpHash[cpIndex].push(data[i])
    }
    
    // console.log('cpContainer: ', cpContainer)
    console.log('cpHash: ', cpHash)
    

    //5.FOR EACH CP GROUP, FIND NEW CP AND UPDATE
    let prevC = c.slice()
    console.log(prevC)

    for(let key in cpHash) {
      if(cpHash[key].length <= 2) continue
      
      let sum = cpHash[key].reduce((acc, curr) => {
        return acc+curr
      }, 0)
      let newCP = sum/cpHash[key].length
      c[key] = newCP
    }

    console.log('new c: ', c)
    console.log('prev c: ', prevC)
    
    //BREAK LOOP IF CPS ARE CONSISTENT
    let b = true
    for(let i = 0; i < c.length; i++) {
      if(Math.abs((c[i]-prevC[i])/c[i]) > 0.1) {
        b = false
      }
    }
    console.log(b)

    if(b) break
    

    //REPEAT 2 -> 5 EITHER UNTIL 'steps' RUN OUT OR NEW CP EQUALS PREVIOUS CP
    step ++
  }

}

//DO I WANT TO RETURN AN MAPPING ARRAY OF CPs IN SAME ORDER TO INPUT DATA?
// [CP0, CP0, CP0, CP1, CP0, CP1, CP2,....]

//OR DO I WANT TO RETURN A HASH WITH DATA AS KEY AND MATCHING CP AS VALUE?
/* {
  DATA0 : CP0,
  DATA1 : CP0,
  DATA2 : CP0,
  DATA3 : CP1,
  DATA4 : CP0, ...
}*/

//OR DO I WANT TO RETURN AN ARRAY OF K NESTED ARRAY WHERE EACH NESTED ARRAY CONTAINS IT'S CLUSTER DATA?
// [[DT0, DT3, DT7, ...], [DT1, DT131, DT132, ...], [DT2, DT4, DT5, ...], ...]

//OR DO I WANT TO RETURN A HASH WITH K KEY-VALUE PAIRS 
/* {
  CP0 : [DT0, DT3, DT7, ...],
  CP1 : [DT1, DT131, DT132, ...],
  CP2 : [DT2, DT4, DT5, ...],
  ...
}*/

kMeans1D([1, 2, 3, 112, 113, 114, 66.5, 33, 66, 35, 75, 99, 35], 3, 10)