//INPUT DATA : NESTED ARRAY [[x0, y0, z0], [x1, y1, z1], ..., [xn, yn, zn]]
//INPUT K : NUMBER

function kMeans3D(data, k = 3, maxSteps = 20) {
  // 1. PICK K CENTROIDS
  let c = data.slice(0, k)
  // console.log(c)

  let step = 0
  while(step < maxSteps) {
    let cHash = {}

    // 2&3.FOR EACT DATA, CALCULATE ITS SQUARE DISTANCE WITH EACH CP & FIND THE CLOEST CP
    for(let i = 0; i < data.length; i++) {
      let centroidIdx = c.reduce((cIndex, curr, idx) => {
        if((Math.pow(data[i][0] - curr[0], 2) + 
            Math.pow(data[i][1] - curr[1], 2) + 
            Math.pow(data[i][2] - curr[2], 2)) <= 
           (Math.pow(data[i][0] - c[cIndex][0], 2) + 
           Math.pow(data[i][1] - c[cIndex][1], 2) + 
           Math.pow(data[i][2] - c[cIndex][2], 2))) {
          return idx
        }
        return cIndex
      }, 0)

      let centroid = c[centroidIdx]
      console.log('data: ', data[i], '; ', 'cp: ', centroid)

      // 4.ADD DATA TO CLOSEST CP KEY IN HASH
      // CREATE HASH
      if(!cHash[centroidIdx]) {
        cHash[centroidIdx] = []
      }
      // ADD TO HASH
      cHash[centroidIdx].push(data[i])
    }

    console.log('cHash: ', cHash)

    // 5. FOR EACH CP GROUP, FIND NEW CP AND UPDATE
    let prevC = c.slice()

    for(let key in cHash) {
      if(cHash[key].length <= 1) continue

      let sum = cHash[key].reduce((acc, curr) => {
        return [acc[0]+curr[0], acc[1]+curr[1], acc[2]+curr[2]]
      }, [0, 0, 0])

      let newCentroid = sum.map(indieSum => indieSum/cHash[key].length)
      c[key] = newCentroid
    }

    console.log('new c: ', c)
    console.log('prev c: ', prevC)

    // BREAK LOOP IF CPS ARE CONSISTENT
    let b = true
    for(let i = 0; i < c.length; i++) {
      if(Math.pow(c[i][0]-prevC[i][0], 2) + Math.pow(c[i][1]-prevC[i][1], 2) + Math.pow(c[i][2]-prevC[i][2], 2) > 0.01) {
        b = false
      }
    }
    console.log(b)

    if(b) break

    step++
  }

  console.log(c)
  return c
}

kMeans3D([[0,0,0], [1,1,1], [2,2,2], [110,110,110], [110, 110, 111], [110, 111, 112], [77, 76, 75], [77, 78, 85]])