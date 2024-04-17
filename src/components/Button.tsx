import { tv } from "tailwind-variants";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  layout?: "primary" | "secondary";
}

const buttonStyle = tv({
  base: "my-2 py-2 px-4 rounded transition-colors font-medium",
  variants: {
    layout: {
      primary: "bg-yellow-500 hover:bg-yellow-600 text-gray-900",
      secondary: "bg-gray-500 hover:bg-gray-600 text-gray-200",
    },
  },
  defaultVariants: {
    layout: "primary",
  },
});

export default function Button({ className, layout, ...props }: Props) {
  return (
    <button {...props} className={` ${buttonStyle({ className, layout })}`} />
  );
}
