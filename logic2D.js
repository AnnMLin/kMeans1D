//INPUT DATA : NESTED ARRAY [[x0, y0], [x1, y1], ..., [xn, yn]]
//INPUT K : NUMBER

function kMeans2D(data, k = 3, maxSteps = 20) {
  //1.PICK K CENTROIDS WITH K-MEANS++
  let c = centroidInit2D(data, k)

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
      if(cHash[key].length <= 1) continue

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

    //BREAK LOOP IF CPS ARE CONSISTENT
    let b = true
    for(let i = 0; i < c.length; i++) {
      if(Math.pow(c[i][0]-prevC[i][0], 2) + Math.pow(c[i][1]-prevC[i][1], 2) > 0.01) {
        b = false
      }
    }
    console.log(b)

    if(b) break

    step++
  }
  
}

function centroidInit2D(data, k) {
  // RANDOM SELECT FIRST CENTROID
  let centroids = []
  centroids.push(data[0])
  k--
  let minDist = [] //a mapping of data array

  while(k > 0) {
    // FOR EACH DATA, CALCULATE DISTANCE TO (NEW) CENTROID & UPDATE IF DISTANCE IS SHORTER THAN EXISTING DIST RECORDED
    for(let i = 0; i < data.length; i++) {
      let newDist = Math.pow(data[i][0] - centroids[centroids.length - 1][0], 2) + Math.pow(data[i][1] - centroids[centroids.length - 1][1], 2)
      if(minDist[i] === undefined) {
        minDist[i] = newDist
      }
      else {
        minDist[i] = Math.min(minDist[i], newDist)
      }
    }

    // THE DATA FURTHEST FROM EXISTING CENTROID IS THE NEW CENTROID
    let nextCentroidIdx = minDist.reduce((acc, curr, idx) => {
      if(curr > minDist[acc]) return idx
      else return acc
    }, 0)

    centroids.push(data[nextCentroidIdx])
    k--
  }
  console.log(centroids)
  return centroids
}

// kMeans2D([[1,1], [1,0], [0,1], [0,0],
//           [4,4], [4,3], [3,4], [3,3],
//           [11,11], [11,10], [10,10], [10,11]], 3, 10)

// kMeans2D([[3,50], [2,2], [6,78], [333, 60], [70,55], [5,68], [78,79], [60,3], [71,53]])

// kMeans2D([[0,1], [1,0], [0,0], [1,1], [30, 29], [29, 30], [30, 30], [29, 29], [70, 71], [71, 71], [70, 70], [71, 70], [112, 113], [113, 113], [112, 112], [113, 112]], 4)

// centroidInit2D([[0,1], [1,0], [0,0], [1,1], [30, 29], [29, 30], [30, 30], [29, 29], [70, 71], [71, 71], [70, 70], [71, 70], [112, 113], [113, 113], [112, 112], [113, 112]], 4)