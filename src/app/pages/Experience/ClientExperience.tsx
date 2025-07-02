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
  const j4 = useRef<RapierRigidBody>(null);
  // Canvas size
  const { width, height } = useThree((state) => state.size);
  // A Catmull-Rom curve
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(), // j4
        new THREE.Vector3(),
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
    [0, 1.45, 0],
  ]);

  // Create material instance
  const [material] = useState(
    () =>
      new MeshLineMaterial({
        color: "white",
        resolution: new THREE.Vector2(width, height),
        lineWidth: 1,
      })
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.7]);
  useRopeJoint(j3, j4, [[0, 0, 0], [0, 0, 0], 0.7]);

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
      j4.current &&
      j3.current &&
      j2.current &&
      j1.current &&
      fixed.current &&
      band.current
    ) {
      curve.points[0].copy(j4.current.translation());
      curve.points[1].copy(j3.current.translation());
      curve.points[2].copy(j2.current.translation());
      curve.points[3].copy(j1.current.translation());
      curve.points[4].copy(fixed.current.translation());

      // Update the geometry with new points
      (band.current.geometry as MeshLineGeometry).setPoints(
        curve.getPoints(32)
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
      <RigidBody position={[0.5, 2.5, 0]} ref={j1}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1, 2, 0]} ref={j2}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[1.5, 1.5, 0]} ref={j3}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody position={[2, 1, 0]} ref={j4}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <mesh ref={band}>
        <meshLineGeometry />
        <primitive object={material} />
      </mesh>
      <RigidBody ref={card} type={dragged ? "kinematicPosition" : "dynamic"}>
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
          <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
          <meshBasicMaterial color="white" side={THREE.DoubleSide} />
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
        className="absolute inset-0 w-screen h-screen pointer-events-auto"
        style={{ zIndex: 20 }}
        camera={{ position: [0, 0, 13], fov: 35 }}
      >
        <Physics debug interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Canvas>
      {/* Content */}
      TODO: Seperate `Content`` into distinct components of Work Experience and
      Header elements.
      <div className="absolute z-30 border border-red-700 inset-0 flex flex-col p-10 pb-[45vh] max-w-[1200px] mx-auto">
        {/* Back Button */}
        FIXME: zIndex
        <Link href="/">
          <div className=" items-center gap-2 mb-6 fixed top-10">
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
        <div className="flex flex-col text-center mt-mt-14 mb-10 w-full">
          <h1 className="text-3xl font-semibold text-[#464644]">Experience</h1>
          <p className="text-xs text-[#727270] mt-4">
            Use the arrow keys to navigate between projects.
          </p>
        </div>
        {/* Work Experience Section - Modified positioning */}
        <div className="flex p-1 max-h-96 overflow-y: auto flex-col gap-5 w-[65vh] ml-14 mt-20">
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
      </div>
      {/* Fixed Skills Panel */}
      <div
        style={{ zIndex: 1 }}
        className="flex flex-col border border-[#DBDAD6] bg-[#f7f6f4] rounded-t-lg gap-5 w-[65vh] fixed bottom-0 right-14 p-6"
      >
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
          <span className="text-xm text-[#727270] ml-2">
            International University of Applied Sciences
          </span>
          <span className="text-xm text-[#727270] ml-2">
            Bachelor of Science in Software Development
          </span>
        </div>
        <div className="flex flex-col">
          <span>Languages</span>
          <span className="text-[#727270] text-xm">English</span>
        </div>
      </div>
    </div>
  );
}

export default ClientExperience;
