import { RenderPass } from 'https://unpkg.com/three@0.120.1/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'https://unpkg.com/three@0.120.1/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.120.1/examples/jsm/postprocessing/UnrealBloomPass.js';

AFRAME.registerSystem("postprocessing", {

    composer: null,
    originalRenderMethod: null,

    /**
     * Initialises this system.
     */

    init() {

        const sceneEl = this.sceneEl;

        const scene = sceneEl.object3D;
        const renderer = sceneEl.renderer;
        const render = renderer.render;
        const camera = sceneEl.camera;

        const clock = new THREE.Clock();
        const composer = new EffectComposer(renderer);

        this.composer = composer;

        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);
        this.originalRenderMethod = render;


        const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        bloomPass.threshold = .7;
        bloomPass.strength = .4;
        bloomPass.radius = 2;

        composer.addPass( bloomPass );

        // Hack the render method.
        let calledByComposer = false;

        renderer.render = function() {
            if(calledByComposer) {
                render.apply(renderer, arguments);
            } else {
                calledByComposer = true;
                composer.render(clock.getDelta());
                calledByComposer = false;
            }
        };
    },
    /**
     * Clean up when the system gets removed.
     */
    remove() {
        this.composer.renderer.render = this.originalRenderMethod;
        this.composer.dispose();
    }
});