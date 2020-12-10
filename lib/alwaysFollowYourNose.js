let movementSpeed = .01;
let userRotationDeg;
let userLookAt;

AFRAME.registerComponent("movement", {
    tick: function(){
        let rot = camera.object3D.rotation; //Rad

        let alpha = rot.y;
        let beta = rot.x;

        userRotationDeg = [alpha*180/Math.PI, beta*180/Math.PI, 0];

        //https://stackoverflow.com/questions/30011741/3d-vector-defined-by-2-angles
        let z = Math.cos(alpha) * Math.cos(beta);
        let x = Math.sin(alpha) * Math.cos(beta);
        let y = -Math.sin(beta);

        userLookAt = [x, y, z];

        let v = scalarTimesVector(movementSpeed, getUnitVector(userLookAt));
        let pos = this.el.object3D.position;
        this.el.object3D.position.set(pos.x - v[0], pos.y - v[1], pos.z - v[2]);
    }
});