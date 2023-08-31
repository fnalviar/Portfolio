import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Clouds from "../assets/clouds.png";

const about = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "TypeScript",
  "Angular",
  "GitHub",
  "NPM",
  "Yarn",
  "Redux",
  "Vercel",
  "Version Control/Git",
  "Bootstrap",
  "SQL",
  "Docker",
  "Jenkins",
  "Java",
];

function randomSkill() {
  return about[Math.floor(Math.random() * about.length)];
}

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = {
    font: "inherit",
    fontSize: 1.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const over = (e) => {
    e.stopPropagation();
    setHovered(true);
  };
  const out = () => setHovered(false);
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);
  useFrame(({ camera }) => {
    ref.current.quaternion.copy(camera.quaternion);

    ref.current.material.color.lerp(
      color.set(hovered ? "#f70042" : "white"),
      0.1
    );
  });
  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      {...props}
      {...fontProps}
      children={children}
    />
  );
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a count x count random words with spherical distribution
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (count + 1);
    const thetaSpan = (Math.PI * 2) / count;
    for (let i = 1; i < count + 1; i++)
      for (let j = 0; j < count; j++)
        temp.push([
          new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
          ),
          randomSkill(),
        ]);
    return temp;
  }, [count, radius]);
  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}

function About() {
  return (
    <div className="container" id="about">
      <div className="about__wrapper" data-aos="fade-down" data-aos-delay="50">
        <div className="about__left playfair">
          I'm a performance-driven Software Engineer with a strong passion for
          website development.
        </div>
        <div className="about__right lato">
          As a Junior Frontend Developer at Scaling, I act as a bridge between
          design and functionality. My role blends design concepts with
          functional frontend code, crafting pixel-perfect interfaces and
          ensuring seamless responsiveness. Collaborating with designers and
          experienced developers, I create user-centric web experiences.
          Mastering HTML, CSS, and JavaScript where I enhance user experiences.
          At , my dedication is in building bridges between aesthetics
          and technology for dynamic digital interfaces.
          <br />
          <br />
          Persistently striving to enhance my expertise and capabilities, I am
          dedicated to refining my knowledge and skills with the goal of
          surpassing my self yesterday.
        </div>
      </div>
      <img id="clouds" src={Clouds} />
    </div>
  );
}

export default About;
