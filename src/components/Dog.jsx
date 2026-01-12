import React, { useEffect, useRef } from "react";
import {
  useGLTF,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dog = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);

  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, gl }) => {
    camera.position.z = 0.55;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions["Take 001"]?.play();
  }, [actions]);

  const [normalMap] = useTexture(["/dog_normals.jpg"]).map((t) => {
    t.flipY = false;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });

  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpeg",
    "/branches_normals.jpeg",
  ]).map((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });

  const mats = useTexture(
    Array.from({ length: 20 }, (_, i) => `/matcap/mat-${i + 1}.png`)
  ).map((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });

  const [
    mat1, mat2, mat3, mat4, mat5,
    mat6, mat7, mat8, mat9, mat10,
    mat11, mat12, mat13, mat14, mat15,
    mat16, mat17, mat18, mat19, mat20,
  ] = mats;

  /* ---------- SHARED UNIFORMS ---------- */
  const materialArray = useRef({
    uMatcapTexture1: { value: mat19 },
    uMatcapTexture2: { value: mat2 },
    uProgress: { value: 1.0 },
  });

  const dogMaterial = new THREE.MeshMatcapMaterial({
    normalMap,
    matcap: mat2,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  });

  function onBeforeCompile(shader) {
    shader.uniforms.uMatcapTexture1 = materialArray.current.uMatcapTexture1;
    shader.uniforms.uMatcapTexture2 = materialArray.current.uMatcapTexture2;
    shader.uniforms.uProgress = materialArray.current.uProgress;

    shader.fragmentShader = shader.fragmentShader.replace(
      "void main() {",
      `
      uniform sampler2D uMatcapTexture1;
      uniform sampler2D uMatcapTexture2;
      uniform float uProgress;
      void main() {
      `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "vec4 matcapColor = texture2D( matcap, uv );",
      `
      vec4 matcapColor1 = texture2D(uMatcapTexture1, uv);
      vec4 matcapColor2 = texture2D(uMatcapTexture2, uv);
      float transitionFactor = 0.2;
      float progress = smoothstep(
        uProgress - transitionFactor,
        uProgress,
        (vViewPosition.x + vViewPosition.y) * 0.5 + 0.5
      );
      vec4 matcapColor = mix(matcapColor2, matcapColor1, progress);
      `
    );
  }

  dogMaterial.onBeforeCompile = onBeforeCompile;

  model.scene.traverse((child) => {
    if (!child.isMesh) return;
    child.material = child.name.includes("DOG")
      ? dogMaterial
      : branchMaterial;
  });

  /* ---------- SCROLL ---------- */
  const modelRef = useRef(model);

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: "#sec-1",
        endTrigger: "#sec-3",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    })
      .to(modelRef.current.scene.position, { z: "-=0.7", y: "+=0.1" })
      .to(modelRef.current.scene.rotation, { x: `+=${Math.PI / 15}` })
      .to(modelRef.current.scene.rotation, { y: `-=${Math.PI}` }, "third")
      .to(
        modelRef.current.scene.position,
        { x: "-=0.5", z: "+=0.6", y: "-=0.05" },
        "third"
      );
  }, []);

  /* ---------- HOVER EVENTS ---------- */

useEffect(()=>{
document.querySelector(`.title[img-title="Tommorowland"]`).addEventListener("mouseenter",()=>{
  materialArray.current.uMatcapTexture1.value = mat19
  gsap.to(materialArray.current.uProgress,{
  value: 0.0,
   duration: 0.3,
   onComplete:()=>{
    materialArray.current.uMatcapTexture2.value = materialArray.current.uMatcapTexture1.value
    materialArray.current.uProgress.value = 1.0
   }
  })
})
document.querySelector(`.title[img-title="Navy Pier"]`).addEventListener("mouseenter",()=>{
  materialArray.current.uMatcapTexture1.value = mat8
  gsap.to(materialArray.current.uProgress,{
  value: 0.0,
   duration: 0.3,
   onComplete:()=>{
    materialArray.current.uMatcapTexture2.value = materialArray.current.uMatcapTexture1.value
    materialArray.current.uProgress.value = 1.0
   }
  })
})
document.querySelector(`.title[img-title="MSI Chicago"]`).addEventListener("mouseenter",()=>{
  materialArray.current.uMatcapTexture1.value = mat9
  gsap.to(materialArray.current.uProgress,{
  value: 0.0,
   duration: 0.3,
   onComplete:()=>{
    materialArray.current.uMatcapTexture2.value = materialArray.current.uMatcapTexture1.value
    materialArray.current.uProgress.value = 1.0
   }
  })
})
document.querySelector(`.title[img-title="Phone"]`).addEventListener("mouseenter",()=>{
  materialArray.current.uMatcapTexture1.value = mat12
  gsap.to(materialArray.current.uProgress,{
  value: 0.0,
   duration: 0.3,
   onComplete:()=>{
    materialArray.current.uMatcapTexture2.value = materialArray.current.uMatcapTexture1.value
    materialArray.current.uProgress.value = 1.0
   }
  })
})
document.querySelector(`.title[img-title="KIKK Festival 2018"]`).addEventListener("mouseenter",()=>{
  materialArray.current.uMatcapTexture1.value = mat10
  gsap.to(materialArray.current.uProgress,{
  value: 0.0,
   duration: 0.3,
   onComplete:()=>{
    materialArray.current.uMatcapTexture2.value = materialArray.current.uMatcapTexture1.value
    materialArray.current.uProgress.value = 1.0
   }
  })
})
document.querySelector(`.title[img-title="The Kennedy Center"]`).addEventListener("mouseenter",()=>{
  materialArray.current.uMatcapTexture1.value = mat8
  gsap.to(materialArray.current.uProgress,{
  value: 0.0,
   duration: 0.3,
   onComplete:()=>{
    materialArray.current.uMatcapTexture2.value = materialArray.current.uMatcapTexture1.value
    materialArray.current.uProgress.value = 1.0
   }
  })
})
document.querySelector(`.title[img-title="Royal Opera Of Wallonia"]`).addEventListener("mouseenter",()=>{
  materialArray.current.uMatcapTexture1.value = mat13
  gsap.to(materialArray.current.uProgress,{
  value: 0.0,
   duration: 0.3,
   onComplete:()=>{
    materialArray.current.uMatcapTexture2.value = materialArray.current.uMatcapTexture1.value
    materialArray.current.uProgress.value = 1.0
   }
  })
})
 

 document.querySelectorAll(`.title`).forEach((el) => {
  el.addEventListener("mouseleave", () => {

    materialArray.current.uMatcapTexture1.value = mat2

    gsap.to(materialArray.current.uProgress, {
      value: 0.0,
      duration: 0.3,
      onComplete: () => {
        materialArray.current.uMatcapTexture2.value =
          materialArray.current.uMatcapTexture1.value
        materialArray.current.uProgress.value = 1.0
      }
    })

  })
})








})

return (
  <>
    <primitive
      object={model.scene}
      position={[0.25, -0.55, 0]}
      rotation={[0, Math.PI / 3.9, 0]}
    />
    <directionalLight position={[0, 5, 5]} />
  </>
);
}
export default Dog;
