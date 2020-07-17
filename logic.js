//INPUT DATA : ARRAY
//INPUT K : NUMBER

function kMeans1D(data, k, maxSteps = 20) {
  //1.RANDOMLY PICK K CENTER POINTS(CP)
  let c = data.slice(0, k)
  //OR MANUALLY ASSIGN C VALUES
  // let c = [1, 11, 13]
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
    
    console.log('cpContainer: ', cpContainer)
    console.log('cpHash: ', cpHash)
    

    //5.FOR EACH CP GROUP, FIND NEW CP AND UPDATE
    for(let key in cpHash) {
      if(cpHash[key].length <= 2) continue
      let newCP = findCP(cpHash[key])
      c[key] = newCP
    }
    console.log('new c: ', c)

    //REPEAT 2 -> 5 EITHER UNTIL 'steps' RUN OUT OR NEW CP EQUALS PREVIOUS CP
    step ++
  }

}


// GIVEN AN ARRAY, FIND THE CENTER VALUE WHERE TOTAL DISTANCE ALL ARRAY VALUE IS SMALLEST 
function findCP(array) {
  const totalDist = Array(array.length)
  totalDist.fill(0)
  let i = 0
  let j = i+1
  let smallest
  let idx

  while(i < array.length-1) {
    let dist = Math.abs(array[j] - array[i])
    totalDist[i] += dist
    totalDist[j] += dist

    if(j < array.length-1) {
      j++
    }
    else {
      if(!smallest || totalDist[i] < smallest) {
        smallest = totalDist[i]
        idx = i
      }

      i++
      j = i+1
    }
  }
  // console.log(smallest, idx, totalDist)
  return array[idx]
}

// findCP([ 1, 2, 3, 9, 10, 18])

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

kMeans1D([1,2,3,11,12,13,111,112,113], 3, 10)