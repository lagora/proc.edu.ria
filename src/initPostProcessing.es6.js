import { renderer } from "./init.es6.js";
import THREE from "three";

var composer = new THREE.EffectComposer( renderer );
composer.addPass( new THREE.RenderPass( scene, camera ) );

var effect = new THREE.ShaderPass( THREE.DotScreenShader );
effect.uniforms[ "scale" ].value = 4;
composer.addPass( effect );

var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
effect.uniforms[ "amount" ].value = 0.0015;
effect.renderToScreen = true;
composer.addPass( effect );
