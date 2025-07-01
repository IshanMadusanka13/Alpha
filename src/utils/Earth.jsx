"use client";
import { OrbitControls, Preload, useGLTF, Html, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const Earth = () => {
	const earth = useGLTF("/planet/scene.gltf");

	return (
		<primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
	);
};

const CanvasLoader = () => {
	const { progress } = useProgress();

	return (
		<Html
			as="div"
			center
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<span className="canvas-loader" />
			<p
				style={{
					fontSize: 20,
					color: "#F1F1F1",
					fontWeight: 800,
					marginTop: 40,
				}}
			>
				{progress.toFixed(2)}%
			</p>
		</Html>
	);
};

const EarthCanvas = () => {
	return (
		<Canvas
			shadows
			frameloop="demand"
			dpr={[1, 2]}
			gl={{ preserveDrawingBuffer: true }}
			camera={{
				fov: 45,
				near: 0.1,
				far: 200,
				position: [-4, 3, 6],
			}}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					autoRotate
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Earth />
				<Preload all />
			</Suspense>
		</Canvas>
	);
};

export default EarthCanvas;