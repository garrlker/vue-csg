```
var points = [ [10,10,0],[10,-10,0],[-10,-10,0],[-10,10,0], [0,0,10] ];
var triangles = [ [0,1,4],[1,2,4],[2,3,4],[3,0,4],[1,0,3],[2,1,3] ] 
<viewer>
  <polyhedron :center="true" :points="points" :triangles="triangles"></polyhedron>
</viewer>
```