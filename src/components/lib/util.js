/* eslint-disable */
import computeNormals from "angle-normals";

/* TODO:
 * Cap the mesh at 65000 vertices
 * Cache faces
 * 
 * 
 */

function csgToGeometry(inputGeometry) {
  var csg = inputGeometry;

  var indices = [];
  var vertices = [];
  var vertexCount = 0;

  // Process the CSG
  csg.toTriangles().forEach((triangle) => {
    var currentTags = [];

    // Triangle
    if (triangle.vertices.length === 3) {
      // Push vertices into array
      triangle.vertices.forEach((vertex) => {
        vertices.push([vertex.pos._x, vertex.pos._y, vertex.pos._z]);
        currentTags.push(vertexCount);
        vertexCount += 1;
      });

      indices.push([currentTags[0],
      currentTags[1],
      currentTags[2]]);
    }
  });
  var normals = computeNormals(indices, vertices);

  return { vertices, indices, normals };
}

export { csgToGeometry };