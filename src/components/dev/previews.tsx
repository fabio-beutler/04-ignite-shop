import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox-next";
import React from "react";

import Home from "@/pages";

import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Home">
        <Home
          products={[{ id: "1", name: "teste", imageUrl: "123", price: 12 }]}
        />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
