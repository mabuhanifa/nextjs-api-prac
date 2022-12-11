import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div>
      <h3>About Page</h3>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} style={{margin:"50px" }}>
          <Image src={`/${i}.avif`} alt="img" width="280" height="400" />
        </div>
      ))}
    </div>
  );
}
