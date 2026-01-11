import React ,{useEffect} from "react";
import { OrbitControls, useGLTF, useTexture,useAnimations } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { texture } from "three/tsl";
const Dog = () => {
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });


 const { actions } = useAnimations(model.animations, model.scene);
   useEffect(()=>{
        actions["Take 001"].play()
   })

  // const textures = useTexture({
  //     normalMap: "/dog_normals.jpg",
  //     sampleMatcap: "/matcap/mat-2.png"
  // })

  const [normalMap, sampleMatCap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture
  });

  // textures.normalMap.flipY = false;
  // textures.sampleMatcap.colorSpace = THREE.SRGBColorSpace;


  const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMatCap,
      });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    }
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 3.9, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Dog;
