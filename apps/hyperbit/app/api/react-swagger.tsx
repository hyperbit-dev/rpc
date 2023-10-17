"use client";

import { Container } from "@/components";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  return (
    <Container>
      <SwaggerUI spec={spec} />
    </Container>
  );
}

export default ReactSwagger;
