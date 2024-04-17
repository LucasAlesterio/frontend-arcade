import { tv } from "tailwind-variants";

export const TabNavigation = {
  Button: TabButton,
  Tab: TabContainer,
  Container: TabBody,
};

function TabContainer(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={"m-2"}>
      <ul className="flex flex-wrap justify-around -mb-px text-sm font-medium text-center">
        {props.children}
      </ul>
    </div>
  );
}

const buttonStyle = tv({
  base: "inline-block p-4 border-b-2 rounded-t-lg",
  variants: {
    active: {
      true: "border-gray-50",
      false: "border-gray-500",
    },
  },
});
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

function TabButton({ children, active, ...props }: ButtonProps) {
  return (
    <li className="me-2">
      <button {...props} className={buttonStyle({ active })} type="button">
        {children}
      </button>
    </li>
  );
}

const bodySelector = tv({
  base: "p-4 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-72 sm:h-auto",
  variants: {
    active: {
      true: "flex",
      false: "hidden",
    },
  },
});

interface BodyProps extends React.HTMLProps<HTMLDivElement> {
  active: boolean;
}

function TabBody({ active, children, ...props }: BodyProps) {
  return (
    <div {...props} className={bodySelector({ active })}>
      {children}
    </div>
  );
}
