import React, { ComponentProps, Suspense } from "react";

import dynamic from "next/dynamic";

interface LazySvgProps extends ComponentProps<"svg"> {
  name: string;
}

export const LazySvg = ({ name, ...props }: LazySvgProps) => {
  const Svg = dynamic(
    () =>
      import(`../../../node_modules/cryptocurrency-icons/svg/color/${name}.svg`)
  );

  return (
    <IconErrorBoundary>
      <Suspense fallback={<DefaultIcon />}>
        <Svg height="32" width="32" {...props} />
      </Suspense>
    </IconErrorBoundary>
  );
};

function DefaultIcon() {
  return <div className="w-8 h-8 bg-gray-200 rounded-full" />;
}

class IconErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <DefaultIcon />;
    }
    return this.props.children;
  }
}
