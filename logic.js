//INPUT DATA : ARRAY
//INPUT K : NUMBER

function kMeans1D(data, k) {
  //RANDOMLY PICK K CENTER POINTS(CP)

  //FOR EACH DATA, CALCULATE ITS DISTANCE^2 WITH EACH CP
  
  //FIND THE CP THAT IS CLOSEST

  //LINK DATA WITH THE CLOSEST CP

  //FOR EACH CP GROUP
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