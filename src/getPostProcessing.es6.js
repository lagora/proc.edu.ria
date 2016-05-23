import THREE from "three";
import { scene, renderer, camera } from "./init.es6.js";

export default function getPostProcessing(scene, renderer, camera) {
  var composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );

  var effect = new THREE.ShaderPass( THREE.DotScreenShader );
  effect.uniforms.scale.value = 4;
  composer.addPass( effect );

  effect = new THREE.ShaderPass( THREE.RGBShiftShader );
  effect.uniforms.amount.value = 0.0015;
  effect.renderToScreen = true;
  composer.addPass( effect );
};
