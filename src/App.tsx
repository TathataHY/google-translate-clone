import { Col, Container, Row, Stack } from "react-bootstrap";
import "./App.css";
import useTranslate from "./hooks/useTranslate";
import SwitchLanguage from "./components/SwitchLanguage";
import LanguageSelector from "./components/LanguageSelector";
import languages from "./data/languages";
import TextReader from "./components/TextReader";

function App() {
  const { state, switchLanguage, setFromLanguage, setToLanguage, setFromText } =
    useTranslate();

  return (
    <>
      <Container fluid>
        <h1>Google Translate</h1>
        <br />

        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                value={state.fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value)}
                languages={languages}
              />

              <textarea
                value={state.fromText}
                onChange={(e) => setFromText(e.target.value)}
                placeholder="Enter text"
                rows={4}
                autoFocus
              />
            </Stack>
          </Col>

          <Col>
            <SwitchLanguage onClick={switchLanguage} />
          </Col>

          <Col>
            <Stack gap={2}>
              <LanguageSelector
                value={state.toLanguage}
                onChange={(e) => setToLanguage(e.target.value)}
                languages={languages.slice(1)} // Exclude auto language
              />

              <TextReader text={state.result} lang={state.toLanguage}>
                <textarea
                  value={state.result}
                  placeholder={state.loading ? "Translating..." : "Translation"}
                  readOnly
                  rows={4}
                />
              </TextReader>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
