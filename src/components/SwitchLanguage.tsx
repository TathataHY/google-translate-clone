import { Button } from "react-bootstrap";

const SwitchLanguage = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <Button variant="link" onClick={onClick}>
        <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path>
        </svg>
      </Button>
    </>
  );
};

export default SwitchLanguage;
