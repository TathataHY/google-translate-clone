import { Button } from "react-bootstrap";

const TextReader = ({
  text,
  lang,
  children,
}: {
  text: string;
  lang: string;
  children: React.ReactNode;
}) => {
  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      synth.speak(utterance);
    } else {
      console.error("La síntesis de voz no está soportada en este navegador.");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          visibility: text ? "visible" : "hidden",
          margin: "0.25rem",
        }}
      >
        <Button
          variant="link"
          onClick={() => navigator.clipboard.writeText(text)}
        >
          <svg
            enableBackground="new 0 0 24 24"
            focusable="false"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <path d="M16,20H5V6H3v14c0,1.1,0.9,2,2,2h11V20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9 C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z"></path>
            </g>
          </svg>
        </Button>
        <Button variant="link" onClick={handleSpeak}>
          <svg focusable="false" width="20" height="20" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm7-.17v6.34L7.83 13H5v-2h2.83L10 8.83zM16.5 12A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"></path>
            <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z"></path>
          </svg>
        </Button>
      </div>

      {children}
    </div>
  );
};

export default TextReader;
