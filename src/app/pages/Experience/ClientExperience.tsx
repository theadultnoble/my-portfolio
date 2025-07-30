"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { format } from "date-fns";
import Link from "next/link";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

// Helper function to create rounded rectangle geometry
function createRoundedRectGeometry(
  width: number,
  height: number,
  radius: number
) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ShapeGeometry(shape);

  // Create proper UV coordinates for the rounded rectangle
  const positions = geometry.attributes.position.array;
  const uvs = [];

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];

    // Map UV coordinates from -width/2 to width/2 and -height/2 to height/2
    const u = (x + width / 2) / width;
    const v = (y + height / 2) / height;

    uvs.push(u, v);
  }

  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

  return geometry;
}

// Define proper types for Sanity image
interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
}

// Define the Experience data structure
interface ExperienceEvent {
  _id: string;
  title: string;
  image: SanityImage;
  startDate: string;
  endDate?: string;
  body: string | { children: { text: string }[] }[];
  slug?: {
    current: string;
  };
}

// Define the Skills data structure
interface Skill {
  _id: string;
  title: string;
}

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImage) {
  return builder.image(source);
}

interface ClientExperienceProps {
  events: ExperienceEvent[];
  skills: Skill[];
}

extend({ MeshLineGeometry, MeshLineMaterial });

function Band(): JSX.Element {
  // References for the band and the joints
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);

  // Load card texture with error handling
  const cardTexture = useTexture("/assets/Profile.jpeg");

  // Canvas size
  const { width, height } = useThree((state) => state.size);
  // A Catmull-Rom curve
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(), // j3
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const card = useRef<RapierRigidBody | null>(null);
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const [dragged, drag] = useState<{ x: number; y: number; z: number } | null>(
    null
  );

  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.35, 0],
  ]);

  // Create material instance with improved styling
  const [material] = useState(
    () =>
      new MeshLineMaterial({
        color: "#2a2a2a",
        resolution: new THREE.Vector2(width, height),
        lineWidth: 1,
      })
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.7]);

  useFrame((state) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (
      j3.current &&
      j2.current &&
      j1.current &&
      fixed.current &&
      band.current
    ) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());

      // Update the geometry with new points for smooth curvature
      (band.current.geometry as MeshLineGeometry).setPoints(
        curve.getPoints(80) // Even more points for smoother curve
      );
      // Tilt the card back towards the screen
      ang.copy(card.current?.angvel() || new THREE.Vector3());
      rot.copy(card.current?.rotation() || new THREE.Vector3());
      if (card.current) {
        card.current.setAngvel(
          { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
          true
        );
      }
    }
  });

  return (
    <>
      <RigidBody ref={fixed} type="fixed" position={[4, 4.5, 0]} />
      <RigidBody
        position={[2, 3.5, 0]}
        ref={j1}
        linearDamping={0.4}
        angularDamping={0.4}
      >
        <BallCollider args={[0.1]} />
        {/* Hidden visual for joints */}
        <mesh visible={false}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial />
        </mesh>
      </RigidBody>
      <RigidBody
        position={[1, 2.5, 0]}
        ref={j2}
        linearDamping={0.4}
        angularDamping={0.4}
      >
        <BallCollider args={[0.1]} />
        {/* Hidden visual for joints */}
        <mesh visible={false}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial />
        </mesh>
      </RigidBody>
      <RigidBody
        position={[0, 1.5, 0]}
        ref={j3}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <BallCollider args={[0.1]} />
        {/* Hidden visual for joints */}
        <mesh visible={false}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial />
        </mesh>
      </RigidBody>
      <mesh ref={band}>
        <meshLineGeometry />
        <primitive object={material} />
      </mesh>

      {/* Metallic clip connecting rope to card - positioned at the top of the card */}
      <RigidBody
        ref={card}
        type={dragged ? "kinematicPosition" : "dynamic"}
        linearDamping={0.8}
        angularDamping={0.8}
      >
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <mesh
          onPointerUp={() => drag(null)}
          onPointerDown={(e) => {
            if (card.current) {
              const offset = new THREE.Vector3()
                .copy(e.point)
                .sub(vec.copy(card.current.translation()));
              drag({ x: offset.x, y: offset.y, z: offset.z });
            }
          }}
        >
          {/* Main card with rounded corners */}
          <primitive object={createRoundedRectGeometry(1.6, 2.25, 0.1)} />
          <meshBasicMaterial
            map={cardTexture}
            side={THREE.DoubleSide}
            // color="#ffffff"
          />

          {/* Metallic clip connecting rope to card - positioned at the top of the card */}
          <mesh position={[0, 1.35, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
            <meshStandardMaterial
              color="#8a8a8a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Clip attachment ring */}
          <mesh position={[0, 1.25, 0]}>
            <torusGeometry args={[0.08, 0.02, 8, 16]} />
            <meshStandardMaterial
              color="#6a6a6a"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </mesh>
        {/* Rounded border using a slightly larger rounded rectangle */}
        <mesh position={[0, 0, -0.001]}>
          <primitive object={createRoundedRectGeometry(1.7, 2.35, 0.12)} />
          <meshBasicMaterial
            color="#1a1a1a"
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      </RigidBody>
    </>
  );
}

function ClientExperience({ events, skills }: ClientExperienceProps) {
  return (
    <div className="relative overflow-y-auto scrollbar-hide w-screen h-[100vh]">
      {/* Band */}
      <Canvas
        className="absolute inset-0 w-screen z-10 h-screen pointer-events-auto"
        camera={{ position: [0, 0, 13], fov: 35 }}
      >
        <Physics timeStep={1 / 60} debug numSolverIterations={20}>
          <Band />
        </Physics>
      </Canvas>
      {/* Content */}
      <div className="absolute  border border-red-700 inset-0 flex flex-col p-10 w-screen h-screen mx-auto">
        {/* Back Button */}
        <Link href="/">
          <div className=" items-center z-10 gap-2 mb-6 fixed top-10 ">
            <button className="flex items-center gap-1 px-4 py-2 bg-[#E9E8E6] rounded-full border border-[#DBDAD6] text-sm text-[#464644]">
              <Icon
                icon="material-symbols-light:arrow-back-rounded"
                style={{ color: "#727270" }}
                width={17}
              />
              <span className="text-xs font-medium">Back to home</span>
            </button>
          </div>
        </Link>

        {/* Title Section */}
        <div className="flex flex-col text-center p-2 z-1  mt-mt-14 mb-10 w-full ">
          <h1 className="text-3xl font-semibold text-[#464644]">Experience</h1>
          <p className="text-xs text-[#727270] mt-4">
            Use the arrow keys to navigate between projects.
          </p>
        </div>

        {/* Work Experience Section - Modified positioning */}
        <div className="flex p-1 h-screen z-5 overflow-y-visible scrollbar-thin scrollbar-thumb-[#727270] scrollbar-track-transparent scrollbar-thumb-rounded-full flex-col gap-5 z-5 w-[65vh] ml-14 mt-20 ">
          <div className="text-lg font-medium">Work Experience</div>
          <div className="flex flex-col gap-2">
            {events.map((event) => {
              const { _id, title, image, startDate, endDate, body } = event;

              return (
                <div
                  key={_id}
                  className="relative flex items-center pb-5 gap-2"
                >
                  <div className="relative mr-3 ml-3 h-[45px] w-[45px] flex-shrink-0">
                    <Image
                      src={urlFor(image).width(400).height(400).url()}
                      alt={title}
                      fill
                      className="rounded-full border-2 border-[#DBDAD6] object-cover"
                      sizes="60px"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-xl text-[#464644]">{title}</p>
                    <p className="text-sm text-[#727270]">
                      {format(new Date(startDate), "MMM yyyy")} -{" "}
                      {endDate
                        ? format(new Date(endDate), "MMM yyyy")
                        : "Present"}
                    </p>
                    <div className="text-xf text-[#727270]">
                      {typeof body === "string"
                        ? body
                        : Array.isArray(body)
                          ? body[0]?.children?.[0]?.text || ""
                          : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fixed Skills Panel */}
        <div className="flex flex-col border border-[#DBDAD6] z-1 bg-[#f7f6f4] rounded-t-lg gap-5 w-[65vh] fixed bottom-0 right-14 p-6">
          <h2 className="text-base font-medium text-[#464644]">Core Skills</h2>
          <div className="flex flex-wrap gap-2 ml-2">
            {skills?.map((skill: Skill) => (
              <span
                key={skill._id}
                className="px-3 py-1 bg-white rounded-full border border-[#DBDAD6] text-xm text-[#727270]"
              >
                {skill.title}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base">Education</span>
            <span className="text-xm text-[#727270]">
              International University of Applied Sciences
            </span>
            <span className="text-xm text-[#727270]">
              Bachelor of Science in Software Development
            </span>
          </div>
          <div className="flex flex-col">
            <span>Languages</span>
            <span className="text-[#727270] text-xm">English</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientExperience;
