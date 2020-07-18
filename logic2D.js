//INPUT DATA : NESTED ARRAY [[x0, y0], [x1, y1], ..., [xn, yn]]
//INPUT K : NUMBER

function kMeans2D(data, k = 3, maxSteps = 20) {
  //1.RANDOMLY PICK K CENTROIDS
  let c = data.slice(0, k) // k = 3, c = [[x0, y0], [x1, y1], [x2, y2]]

  let step = 0
  while(step < maxSteps) {
    let cHash = {} //index at c : [[x0, y0], [x4, y4], ...]

    //2.FOR EACH DATA, CALCULATE ITS DISTANCE^2 WITH EACH CP
    for(let i = 0; i < data.length; i++) {
      //3.FIND THE CP THAT IS CLOSEST
      //GET data[i] TO EACH CP DISTANCE
      let centroidIdx = c.reduce((cIndex, currentCentroid, idx) => {
        if((Math.pow(data[i][0] - currentCentroid[0], 2) + Math.pow(data[i][1] - currentCentroid[1], 2)) <= (Math.pow(data[i][0] - c[cIndex][0], 2) + Math.pow(data[i][1] - c[cIndex][1], 2))) {
          return idx
        }
        else {
          return cIndex
        }
      }, 0) //start at idx 0

      let centroid = c[centroidIdx]
      console.log('data: ', data[i], '; ', 'cp: ', centroid)

      //4.LINK DATA WITH THE CLOSEST CP
      // CREATE HASH
      if(!cHash[centroidIdx]) {
        cHash[centroidIdx] = []
      }
      // ADD TO HASH
      cHash[centroidIdx].push(data[i])
    }

    console.log('cHash: ', cHash)

    //5.FOR EACH CP GROUP, FIND NEW CP AND UPDATE
    let prevC = c.slice()
    
    for(let key in cHash) {
      if(cHash[key].length <= 2) continue

      let xSum = cHash[key].reduce((acc, curr) => {
        return acc + curr[0]
      }, 0) 
      let ySum = cHash[key].reduce((acc, curr) => {
        return acc + curr[1]
      }, 0)
      let newX = xSum/cHash[key].length
      let newY = ySum/cHash[key].length
      let newCentroid = [newX, newY]

      c[key] = newCentroid
    }

    console.log('new c: ', c)
    console.log('prev c: ', prevC)

    step++
  }
  
}

kMeans2D([[1,1], [1,0], [0,1], [0,0],
          [4,4], [4,3], [3,4], [3,3],
          [11,11], [11,10], [10,10], [10,11]], 3, 10)