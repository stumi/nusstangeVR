
function getMagnitude(v){
    return Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2) + Math.pow(v[2],2));
}

function getUnitVector(v){
    var mag = getMagnitude(v);

    return [v[0]/mag, v[1]/mag, v[2]/mag];
}

function scalarTimesVector(s, v){
    return [s*v[0], s*v[1], s*v[2]];
}

function addVectors(v1, v2){
    return [v1[0]+v2[0], v1[1]+v2[1], v1[2]+v2[2]];
}

function subtractVectors(v1, v2){
    return [v1[0]-v2[0], v1[1]-v2[1], v1[2]-v2[2]];
}