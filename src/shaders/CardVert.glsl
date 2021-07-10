varying vec2 vUv;
uniform float growthT;
uniform float timeMSec;
uniform vec3 worldMousePos;

attribute vec3 _primcenter;

vec4 quat_from_axis_angle(vec3 axis, float angle)
{ 
  vec4 qr;
  float half_angle = (angle * 0.5);
  qr.x = axis.x * sin(half_angle);
  qr.y = axis.y * sin(half_angle);
  qr.z = axis.z * sin(half_angle);
  qr.w = cos(half_angle);
  return qr;
}

vec3 rotate_vertex_position(vec3 position, vec3 axis, float angle)
{ 
  vec4 q = quat_from_axis_angle(axis, angle);
  vec3 v = position.xyz;
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

vec2 rotate(vec2 point, float degree, vec2 pivot)
{
    float radAngle = -radians(degree);// "-" - clockwise
    float x = point.x;
    float y = point.y;

    float rX = pivot.x + (x - pivot.x) * cos(radAngle) - (y - pivot.y) * sin(radAngle);
    float rY = pivot.y + (x - pivot.x) * sin(radAngle) + (y - pivot.y) * cos(radAngle);

    return vec2(rX, rY);
}
float randz(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
void main() {
  vUv = uv;
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vec3 modPrim = _primcenter;
  modPrim.y = 0.05 - modPrim.z;
  modPrim.z = 0.0;
  vec4 worldPrimCenter = modelMatrix * vec4( modPrim, 1.0 );
  vec2 dirToPrim = worldPrimCenter.xy - worldMousePos.xy;
  vec2 dirToPrimNorm = normalize(dirToPrim);
  float randVal = randz(100.0*_primcenter.xy);

  float distToMousePos = 1.0 - min(length(dirToPrim)/0.2,1.0);

  worldPosition.xy += 0.01*distToMousePos * dirToPrimNorm;

  float distToMousePosUnClamp =30.0*pow(length(worldPrimCenter.xy- worldMousePos.xy),4.0) + 0.1;
  float minorMove = 1.0 + 0.05*smoothstep(1.7, 2.0, growthT) * sin(timeMSec + 100.0*randVal);

  worldPosition.xy += growthT * distToMousePosUnClamp * dirToPrimNorm;
  worldPosition.z += 10.0*(distToMousePosUnClamp-0.1)*growthT*randVal*minorMove;

  vec4 modelViewPosition = viewMatrix * worldPosition;
  gl_Position = projectionMatrix * modelViewPosition;
}